
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import RadioHeader from '../Shared/DataTableHeaders/RadioHeader'
import DataListWrapper from '../Shared/DataListWrapper'
import ActionBar from '../ActionBar'
import DataTable from '../Shared/DataTable'
import SideDetailView from '../Shared/SideDetailView'

// Forms
import UserForm from '../Forms/UserForm'
import DeleteForm from '../Forms/DeleteForm'
import IntegrationForm from '../Forms/IntegrationForm'
import ErrorForm from '../Forms/ErrorForm'

// Tracking
import Mixpanel from 'mixpanel-browser'

// Actions
import * as UserActions from '../../actions/users'

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

    // Setup our data source
    
    this.dataList = new DataListWrapper(this.props.userState.users)
    this.state = {
      selectedList: [],
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
  }

  /**
   * Helper for determining the viewport width after
   * component mount. Needed for the FB table to calc correctly
   */
  _getActionBarHeight() {
    let dom = ReactDOM.findDOMNode(this)
    const height = dom.querySelectorAll('div.action-bar')[0].clientHeight
    this.setState({ actionBarHeight: height })
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
      let size = this.dataList.getSize();
      let filteredIndexes = [];
      for (let index = 0; index < size; index++) {
        let { first_name } = this.dataList.getObjectAt(index);
        if (first_name.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
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
      selectedList.push(user)
    } else {
      selectedList.pop(user)
    }
    this.setState({
      selectedList: selectedList
    });
  }

  /**
   * handleSelectAll takes care of handling the event where all users are toggles
   * @param  {[type]} e The event
   */
  _handleSelectAll(e) {
    let selectedList = []
    if (e.target.checked) {
      for (let idx = 0; idx < this.state.filteredDataList.getSize(); idx++) {
        const user = this.state.filteredDataList.getObjectAt(idx)
        selectedList.push(user)
      }
    }
    this.setState({
      selectedList: selectedList
    });
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
    if (this.state.selectedList.length == 0) {
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
    for (let idx in this.state.selectedList) {
      let user = this.state.selectedList[idx]
      this.props.userActions.publishUser(user, providers)
    }

    this.setState({
      selectedList: [],
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
    if (this.state.selectedList.length == 0) {
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
    for (let idx in this.state.selectedList) {
      let user = this.state.selectedList[idx]
      this.props.userActions.deleteUser(user)
    }

    this.setState({
      selectedList: [],
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

    // Revised container Height for Table
    const tableContainerHeight = this.props.containerHeight - this.state.actionBarHeight

    // Setting up our action bar.
    let newAction = { handler: this.handleNewClick, title: 'New', type: 0, glyph:'glyphicon glyphicon-plus' };
    let publishAction = { handler: this.handlePublishClick, title: 'Publish', type: 0, glyph:'glyphicon glyphicon-refresh' };
    let deleteAction = { handler: this.handleDeleteClick, title: 'Delete', type: 0, glyph: 'glyphicon glyphicon-remove' };
    let addToAction = { handler: this.handleAddToClick, title: 'Add To', type: 0, glyph: 'glyphicon glyphicon-asterisk' };
    let actions = [newAction, publishAction, deleteAction, addToAction];

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
          providers={this.props.providerState.providers}
        />
      )
    }

    let columns = []

    let radioCell = (<RadioCell col="radio" data={filteredDataList} onChange={this.handleSelectOne} selectedList={selectedList} />)
    columns.push(<Column cell={radioCell} header={<RadioHeader onSelectAll={this.handleSelectAll}/>} key={'radio'} width={32}/>)

    let emailCell = (<TextCell col="email" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={emailCell} header={<Cell>{'Email'}</Cell>} key={'email'} width={250}/>)

    let firstNameCall = (<TextCell col="first_name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={firstNameCall} header={<Cell>{'First Name'}</Cell>} key={'first_name'} width={150}/>)

    let lastNameCell = (<TextCell col="last_name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={lastNameCell} header={<Cell>{'Last Name'}</Cell>} key={'last_name'} width={150}/>)

    let phoneCell = (<TextCell col="phone" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={phoneCell} header={<Cell>{'Phone'}</Cell>} key={'phone'} width={200}/>)

    let organizationCell = (<TextCell col="organization_name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={organizationCell} header={<Cell>{'Organization'}</Cell>} key={'organization_name'} width={200}/>)

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
  integrationState: PropTypes.object.isRequired,
  listState: PropTypes.object.isRequired,
  providerState: PropTypes.object.isRequired,
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
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(UserTable)
