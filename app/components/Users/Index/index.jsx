
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import Lunr from 'lunr'
import _ from 'underscore'

// Components
import FixedDataTable from 'fixed-data-table'
import TextCell from '../../Shared/DataTableCells/TextCell'
import RadioCell from '../../Shared/DataTableCells/RadioCell'
import RadioHeader from '../../Shared/DataTableHeaders/RadioHeader'
import DataListWrapper from '../../Shared/DataListWrapper'
import ActionBar from '../../ActionBar'
import DataTable from '../../Shared/DataTable'
import SideDetailView from '../../Shared/SideDetailView'
import { Button } from 'react-bootstrap'

// Forms
import UserForm from '../../Forms/UserForm'
import DeleteForm from '../../Forms/DeleteForm'
import IntegrationForm from '../../Forms/IntegrationForm'
import ErrorForm from '../../Forms/ErrorForm'

// Tracking
import Mixpanel from 'mixpanel-browser'

// HAWKSs
import { IntervalWrapper } from '../../../hawks/interval'

// Actions
import * as UserActions from '../../../actions/users'
import * as IntegrationActions from '../../../actions/integrations'

// ID for tracking the polling w/ the token
const USER_POLLING_TOKEN = 'USER_POLLING_TOKEN'

// Transitions
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const { Column, Cell } = FixedDataTable;

class UserTable extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Tracking  
    Mixpanel.track('Visited Users')

    // User Selection
    this.handleSelectOne = this._handleSelectOne.bind(this)
    this.handleSelectAll = this._handleSelectAll.bind(this)

    // New User Handlers
    this.handleNewClick = this._handleNewClick.bind(this)
    this.handleSaveUser = this._handleSaveUser.bind(this)
    this.handleCloseUserForm = this._handleCloseUserForm.bind(this)

    // Delete User Handlers
    this.handleDeleteClick = this._handleDeleteClick.bind(this)
    this.handleDeleteUser = this._handleDeleteUser.bind(this)
    this.handleCloseDeleteForm = this._handleCloseDeleteForm.bind(this)

    // Publish User Handlers
    this.handlePublishClick = this._handlePublishClick.bind(this)
    this.handlePublishUser = this._handlePublishUser.bind(this)
    this.handleCloseIntegrationForm = this._handleCloseIntegrationForm.bind(this)

    // Add User To Handlers
    this.handleAddToClick = this._handleAddToClick.bind(this)
    this.handleAddUserTo = this._handleAddUserTo.bind(this)
    this.handleCloseAddToFrom = this._handleCloseAddToForm.bind(this)

    // Cell Selection
    this.handleCellClick = this._handleCellClick.bind(this)
    this.handleUpdateUser = this._handleUpdateUser.bind(this)

    // Searching
    this.handleSearch = this._handleSearch.bind(this)

    // Errors
    this.handleCloseErrorForm = this._handleCloseErrorForm.bind(this)

    // No Content
    this.contentForNoIntegrations = this._contentForNoIntegrations.bind(this)
    this.contentForNoUsers = this._contentForNoUsers.bind(this)
    this.navToIntegrations = this._navToIntegrations.bind(this)

    // Integration Sync State
    this.checkForIntegrationsCurrentlySyncing = this._checkForIntegrationsCurrentlySyncing.bind(this)

    // Setup our data source
    this.dataList = new DataListWrapper(this.props.userState.users)
    this.indexer = Lunr(function () {
      this.field('first_name')
      this.field('last_name')
      this.field('email')
    })    
    _.each(this.props.userState.users, (user) => {
      this.indexer.add(user)
    })

    this.state = {
      selectedList: {},
      selectedIntegration: null,
      selectedUser: null,
      filteredDataList: this.dataList,
      userFormDisplayed: false,
      sideDetailDisplayed: false,
      providerFormDisplayed: false,
      deleteFormDisplayed: false,
      addToFormDisplayed: false,
      errorFormDisplayed: false
    };
  }

  // First: Mounted
  componentDidMount() {
    this._getActionBarHeight()
  }

  // First: Received props
  componentWillReceiveProps(nextProps) {
    this.dataList = new DataListWrapper(nextProps.userState.users)
    this.setState({
      filteredDataList: this.dataList
    });
    this.indexer = Lunr(function () {
      this.field('first_name')
      this.field('last_name')
      this.field('email')
    })    
    _.each(this.props.userState.users, (user) => {
      this.indexer.add(user)
    })
  }

  // Checks for currently syncing integrations
  _checkForIntegrationsCurrentlySyncing() {
    if (this.props.integrationState.isSyncing) {
      const syncFunc = this.props.userActions.refreshUsers
      this.props.setIntervalWithToken(USER_POLLING_TOKEN, syncFunc, 3000)
    } else {
      this.props.removeIntervalWithToken(USER_POLLING_TOKEN)
    }
  }

  /**
   * Helper for determining the viewport width after
   * component mount. Needed for the FB table to calc correctly
   */
  _getActionBarHeight() {
    let dom = ReactDOM.findDOMNode(this)
    const actionBarDoms = dom.querySelectorAll('div.action-bar')
    if (actionBarDoms.length) {
      const height = dom.querySelectorAll('div.action-bar')[0].clientHeight
      this.setState({ actionBarHeight: height })      
    }
  }

  //----------------------------------------------------------------------------
  // Error Handling
  //----------------------------------------------------------------------------

  _handleCloseErrorForm() {
    this.setState({
      errorFormDisplayed: false
    });
  }

  //----------------------------------------------------------------------------
  // List Searching
  //----------------------------------------------------------------------------

  _handleSearch(e) {
    let dataList;
    if (e.target.value) {
      let filterBy = e.target.value.toLowerCase();
      const regex = new RegExp(filterBy, 'i');
      let size = this.dataList.getSize();
      let filteredIndexes = [];
      for (let index = 0; index < size; index++) {
        let { first_name, last_name, email } = this.dataList.getObjectAt(index);
        // First Name
        if (first_name.search(regex) != -1) {
          filteredIndexes.push(index);
          continue
        }

        // Last Name
        if (last_name.search(regex) != -1) {
          filteredIndexes.push(index);
          continue
        }

        // Email
        if (email.search(regex) != -1) {
          filteredIndexes.push(index);
          continue
        }        
      }
      dataList = new DataListWrapper(this.props.userState.users, filteredIndexes)
    } else {
      dataList = this.dataList
    }
    this.setState({
      filteredDataList: dataList
    });
  }

  //----------------------------------------------------------------------------
  // User Selection
  //----------------------------------------------------------------------------

  /**
   * handleSelectOne takes care of handling the event where one list is selected.
   * @param  {[type]} e The event
   * @param  {[type]} idx The index for the list.
   */
  _handleSelectOne(e, idx) {
    let selectedList = this.state.selectedList
    const user = this.state.filteredDataList.getObjectAt(idx)
    if (e.target.checked) {
      selectedList[user.id] = true
    } else {
      delete selectedList[user.id]
    }
    this.setState({ selectedList: selectedList })
  }

  /**
   * handleSelectAll takes care of handling the event where all users are toggles
   * @param  {[type]} e The event
   */
  _handleSelectAll(e) {
    let selectedList = {}
    if (e.target.checked) {
      for (let idx = 0; idx < this.state.filteredDataList.getSize(); idx++) {
        const user = this.state.filteredDataList.getObjectAt(idx)
        selectedList[user.id] = true
      }
    }
    this.setState({ selectedList: selectedList })
  }

  //----------------------------------------------------------------------------
  // New Action
  //----------------------------------------------------------------------------

  /**
   * _handleNewUser handles a click to the `New` action bar button.
   */
  _handleNewClick() {
    this.setState({
      userFormDisplayed: true,
      sideDetailDisplayed: false
    });
  }

  // Create list via Mesh API.
  _handleSaveUser(params) {
    this.props.userActions.createUser(params)
    this.setState({
      userFormDisplayed: false,
      sideDetailDisplayed: false
    });
  }

  _handleCloseUserForm() {
    this.setState({
      selectedUser: null,
      userLists: null,
      userFormDisplayed: false,
      sideDetailDisplayed: false
    });
  }

  //----------------------------------------------------------------------------
  // Publish Action
  //----------------------------------------------------------------------------

  /**
   * _handlePublishClick handles a click to the `Publish` action bar button.
   */
  _handlePublishClick() {
    if (_.keys(this.state.selectedList) == 0) {
      this.setState({
        errorFormDisplayed: true
      });
    } else {
      this.setState({
        providerFormDisplayed: true
      });
    }
  }

  _handlePublishUser(params) {
    let providers = [];
    this.props.providerState.providers.map(function(provider) {
      let name = provider['name']
      let shouldPublish = params[name]
      if (shouldPublish === true) {
        providers.push(provider.key)
      }
    });
    
    _.each(this.state.selectedList, (userId) => {
      let user = this.state.selectedList[userId]
      this.props.userActions.publishUser(user, providers)
    })

    this.setState({
      selectedList: {},
      providerFormDisplayed: false
    });
  }

  _handleCloseIntegrationForm() {
    this.setState({
      providerFormDisplayed: false
    });
  }

  //----------------------------------------------------------------------------
  // Delete Action
  //----------------------------------------------------------------------------

  /**
   * _handleDeleteClick handles a click to the `Delete` action bar button.
   */
  _handleDeleteClick() {
    if (_.keys(this.state.selectedList) == 0) {
      this.setState({
        errorFormDisplayed: true
      });
    } else {
      this.setState({
        deleteFormDisplayed: true
      });
    }
  }

  _handleDeleteUser() {
    _.each(this.state.selectedList, (userID) => {
      let user = this.state.selectedList[userID]
      this.props.userActions.deleteUser(user)
    })

    this.setState({
      selectedList: {},
      deleteFormDisplayed: false
    });
  }

  _handleCloseDeleteForm() {
    this.setState({
      deleteFormDisplayed: false
    });
  }

  //----------------------------------------------------------------------------
  // Add To Action
  //----------------------------------------------------------------------------

  /**
   * _handleNewUser handles a click to the `New` action bar button.
   */
  _handleAddToClick() {
    this.setState({
      addToFormDisplayed: true
    });
  }

  _handleAddUserTo(params) {
  this.props.userActions.createUser(params)
    this.setState({
      addToFormDisplayed: false
    });
  }

  _handleCloseAddToForm() {
    this.setState({
      addToFormDisplayed: false
    });
  }

  //----------------------------------------------------------------------------
  // Show Action
  //----------------------------------------------------------------------------

  /**
   * _handleShowUserDetail handles a click on the actual list in the table.
   */
   _handleCellClick(idx) {
     let user = this.state.filteredDataList.getObjectAt(idx)
     this.props.userActions.requestDetailUser(user)
     Mixpanel.track('Clicked User Row')
     this.setState({
       selectedUser: user,
       userFormDisplayed: false,
       sideDetailDisplayed: true
     });
   }

  _handleUpdateUser(params) {
    this.props.userActions.updateUser(this.state.selectedUser, params)
    this.setState({
      userLists: null,
      selectedUser: null,
      userFormDisplayed: false,
      sideDetailDisplayed: false
    });
  }

  //----------------------------------------------------------------------------
  // No Content... Content
  //----------------------------------------------------------------------------
  
  _navToIntegrations(e) {
    e.preventDefault()
    browserHistory.push('/integrations')
  }

  _contentForNoIntegrations() {
    return (
      <div className="row">
        <div className="no-content col-xs-12">
          <div className="text-container">
            <h2>{'Welcome to Mesh'}</h2>
            <p>{'It looks like you don\'t have any users'}</p>
            <p className="bottom-instruction">{'because no integrations are turned on yet.'}</p>
            <Button bsStyle={'success'} className={'integrations-button'} onClick={this.navToIntegrations}>{'Take Me To Integrations'}</Button>
          </div>
        </div>
      </div>
    )
  }

  _contentForNoUsers() {
    return (
      <div className="row">
        <div className="no-content col-xs-12">
          <div className="text-container">
            <h2>{'No Users Yet'}</h2>
            <p>{'It looks like you don\'t have any users associated'}</p>
            <p className="bottom-instruction">{'with the integration you have activated, or they\'re still syncing.'}</p>
            <Button bsStyle={'success'} className={'integrations-button'} onClick={this.navToIntegrations}>{'Take Me To Integrations'}</Button>
          </div>
        </div>
      </div>
    )
  }

  //----------------------------------------------------------------------------
  // Filtering Action
  //----------------------------------------------------------------------------

  handleOnFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this.dataList
      });
    }

    let filterBy = e.target.value.toLowerCase();
    let size = this._dataList.getSize();
    let filteredIndexes = [];
    for (let index = 0; index < size; index++) {
      let { name } = this._dataList.getObjectAt(index);
      if (name.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      filteredDataList: new DataListWrapper(this.props.userState.users, filteredIndexes)
    });
  }

  render() {
    const { filteredDataList, selectedList, sideDetailDisplayed } = this.state
    const { integrationState, userState } = this.props

    // Revised container Height for Table
    const tableContainerHeight = this.props.containerHeight - this.state.actionBarHeight

    // Setting up our action bar.
    let newAction = { handler: this.handleNewClick, title: 'New', type: 0, glyph:'glyphicon glyphicon-plus' };
    let deleteAction = { handler: this.handleDeleteClick, title: 'Delete', type: 0, glyph: 'glyphicon glyphicon-remove' };
    let actions = [newAction, deleteAction];

    let forms = (
      <div className={'forms'}>
        <UserForm
          displayed={this.state.userFormDisplayed}
          lists={this.state.userLists}
          onCancel={this.handleCloseUserForm}
          onSave={this.handleSaveUser}
          onUpdate={this.handleUpdateUser}
          user={this.state.selectedUser}
        />
        <DeleteForm
          displayed={this.state.deleteFormDisplayed}
          onCancel={this.handleCloseDeleteForm}
          onDelete={this.handleDeleteUser}
        />
        <IntegrationForm
          displayed={this.state.providerFormDisplayed}
          integrations={this.props.integrationState.integrations}
          onCancel={this.handleCloseIntegrationForm}
          onPublish={this.handlePublishUser}
        />
        <ErrorForm
          displayed={this.state.errorFormDisplayed}
          error={"Please Select a User"}
          onOK={this.handleCloseErrorForm}
        />
      </div>
    )

    let sideDetail = null
    if (sideDetailDisplayed === true) {
      let user = this.state.selectedUser
      if (this.props.userState.detailUser) {
        user = this.props.userState.detailUser
      }
      const { isFetchingDetail } = this.props.userState
      sideDetail = (
        <SideDetailView 
          detailUser={user} 
          isFetchingDetailUser={isFetchingDetail} 
          key="side-detail" 
          onExit={this.handleCloseUserForm}
          panelRelativeWidth="40%"
          providersByKey={this.props.providerState.providersByKey}
        />
      )
    }

    // Determine if all are selected
    const allSelected = _.keys(selectedList).length == filteredDataList.getSize()

    let columns = []

    let radioCell = (<RadioCell col="radio" data={filteredDataList} onChange={this.handleSelectOne} selectedList={selectedList} />)
    columns.push(<Column cell={radioCell} header={<RadioHeader allAreSelected={allSelected} onSelectAll={this.handleSelectAll}/>} key={'radio'} width={32}/>)

    let emailCell = (<TextCell col="email" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={emailCell} header={<Cell>{'Email'}</Cell>} key={'email'} width={250}/>)

    let firstNameCall = (<TextCell col="first_name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={firstNameCall} header={<Cell>{'First Name'}</Cell>} key={'first_name'} width={200}/>)

    let lastNameCell = (<TextCell col="last_name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={lastNameCell} header={<Cell>{'Last Name'}</Cell>} key={'last_name'} width={200}/>)

    let phoneCell = (<TextCell col="phone" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={phoneCell} header={<Cell>{'Phone'}</Cell>} key={'phone'} width={200}/>)

    let organizationCell = (<TextCell col="organization_name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={organizationCell} header={<Cell>{'Organization'}</Cell>} key={'organization_name'} width={200}/>)

    // No Content determination
    // Get integration count to determine whether to show content
    const integraitonCount = integrationState.integrations.length
    const usersCount = userState.users.length
    let tableContent = null
    if (integraitonCount || usersCount) {
      tableContent = (
        <div className="active-table-content">
          <div className="action-bar">
            <ActionBar
              actions={actions}
              onSearchInput={this.handleSearch}
              providers={this.props.providerState.providers}
            />
          </div>
          <div className="table">
            <DataTable
              columns={columns}
              containerHeight={tableContainerHeight}
              maxHeight={tableContainerHeight}
              rowCount={filteredDataList.getSize()}
              {...this.props}
            />
          </div>
        </div>
      )
    } else if (integraitonCount) {
      tableContent = this.contentForNoUsers()
    } else {
      tableContent = this.contentForNoIntegrations()
    }

    return (
      <div className="users-component">
        <div className="modals-container">
          {forms}
        </div>
        <div className="detail-side-pane">
          <ReactCSSTransitionGroup transitionEnterTimeout={900} transitionLeaveTimeout={500} transitionName="user-panel">
            {sideDetail}
          </ReactCSSTransitionGroup>
        </div>
        {tableContent}
      </div>
    );
  }
}

UserTable.displayName = 'User Table';

UserTable.defaultProps = {
  users: [],
  width: 1000
}

UserTable.propTypes = {
  containerHeight: PropTypes.number,
  integrationActions: PropTypes.object.isRequired,
  integrationState: PropTypes.object.isRequired,
  listState: PropTypes.object.isRequired,
  providerState: PropTypes.object.isRequired,
  removeIntervalWithToken: PropTypes.func.isRequired,
  setIntervalWithToken: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    integrationState: state.integrations,
    listState: state.lists,
    providerState: state.providers,
    userState: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    integrationActions: bindActionCreators(IntegrationActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

// Wrapping the Provider component in a HOC
const WrappedUserTable = IntervalWrapper(UserTable)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUserTable)
