
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'

// Components
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import RadioHeader from '../Shared/DataTableHeaders/RadioHeader'
import PillCell from '../Shared/DataTableCells/PillCell'
import DataListWrapper from '../Shared/DataListWrapper'
import ActionBar from '../ActionBar'
import DataTable from '../Shared/DataTable'
import SideDetailView from '../Shared/SideDetailView'
import { Button } from 'react-bootstrap'

// Forms
import OrganizationForm from '../Forms/OrganizationForm'
import DeleteForm from '../Forms/DeleteForm'
import IntegrationForm from '../Forms/IntegrationForm'
import ErrorForm from '../Forms/ErrorForm'

// Actions
import * as IntegrationActions from '../../actions/integrations'
import * as OrganizationActions from '../../actions/organizations'
import * as UserActions from '../../actions/users'

// Tracking 
import Mixpanel from 'mixpanel-browser'

// HAWKSs
import { IntervalWrapper } from '../../hawks/interval'

// Underscore
import _ from 'underscore'

// ID for tracking the polling w/ the token
const ORGANIZATION_POLLING_TOKEN = 'ORGANIZATION_POLLING_TOKEN'

// Transitions
const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

const { Column, Cell } = FixedDataTable;

class OrganizationTable extends Component {
  constructor(props) {
    super(props);

    // Tracking  
    Mixpanel.track('Visited Orgs')

    // Organization Selection
    this.handleSelectOne = this._handleSelectOne.bind(this)
    this.handleSelectAll = this._handleSelectAll.bind(this)

    // New Organization Handlers
    this.handleNewClick = this._handleNewClick.bind(this)
    this.handleSaveOrganization = this._handleSaveOrganization.bind(this)
    this.handleCloseOrganizationForm = this._handleCloseOrganizationForm.bind(this)
    this.handleCloseUserForm = this._handleCloseUserForm.bind(this)

    // Delete Organization Handlers
    this.handleDeleteClick = this._handleDeleteClick.bind(this)
    this.handleDeleteOrganization = this._handleDeleteOrganization.bind(this)
    this.handleCloseDeleteForm = this._handleCloseDeleteForm.bind(this)

    // Publish Organization Handlers
    this.handlePublishClick = this._handlePublishClick.bind(this)
    this.handlePublishOrganization = this._handlePublishOrganization.bind(this)
    this.handleCloseProviderForm = this._handleCloseProviderForm.bind(this)

    // Cell Selection
    this.handleCellClick = this._handleCellClick.bind(this)
    this.handleUpdateOrganization = this._handleUpdateOrganization.bind(this)
    this.handleShowingSelectedUser = this._handleShowingSelectedUser.bind(this)

    // Searching
    this.handleSearch = this._handleSearch.bind(this)
    
    // No Content
    this.contentForNoIntegrations = this._contentForNoIntegrations.bind(this)
    this.navToIntegrations = this._navToIntegrations.bind(this)
    this.contentForNoOrgs = this._contentForNoOrgs.bind(this)

    // Integration Syncing
    this.checkForIntegrationsCurrentlySyncing = this._checkForIntegrationsCurrentlySyncing.bind(this)

    // Errors
    this.handleCloseErrorForm = this._handleCloseErrorForm.bind(this)

    // Setup our data source
    this.dataList = new DataListWrapper(this.props.organizationState.organizations)
    this.state = {
      deleteFormDisplayed: false,
      errorFormDisplayed: false,
      filteredDataList: this.dataList,
      organizationFormDisplayed: false,
      providerFormDisplayed: false,
      selectedList: {},
      selectedOrganization: null,
      selectedOrganizationUsers: [],
      selectedProvider: null,
      orgSideDetailDisplayed: false,
      userSideDetailDisplayed: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this.setState({
      selectedOrganizationUsers: nextProps.organizationState.users
    });
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
  // Integration Syncing
  //----------------------------------------------------------------------------
  
  _checkForIntegrationsCurrentlySyncing() {
    if (this.props.integrationState.isSyncing) {
      const syncFunc = this.props.userActions.refreshOrganizations
      this.props.setIntervalWithToken(ORGANIZATION_POLLING_TOKEN, syncFunc, 3000)
      console.log("Org Polling")
    } else {
      this.props.removeIntervalWithToken(ORGANIZATION_POLLING_TOKEN)
      console.log("org Polling Stopped")
    }
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
        let { name } = this.dataList.getObjectAt(index);
        // First Name
        if (name.search(regex) != -1) {
          filteredIndexes.push(index);
          continue
        }
      }
      dataList = new DataListWrapper(this.props.organizationState.organizations, filteredIndexes)
    } else {
      dataList = this.dataList
    }
    this.setState({
      filteredDataList: dataList
    });
  }

  //----------------------------------------------------------------------------
  // Organization Selection
  //----------------------------------------------------------------------------

  /**
   * handleSelectOne takes care of handling the event where one list is selected.
   * @param  {[type]} e The event
   * @param  {[type]} idx The index for the list.
   */
  _handleSelectOne(e, idx) {
    let selectedList = this.state.selectedList
    const org = this.state.filteredDataList.getObjectAt(idx)
    if (e.target.checked) {
      selectedList[org.id] = true
    } else {
      delete selectedList[org.id]
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
        const org = this.state.filteredDataList.getObjectAt(idx)
        selectedList[org.id] = true
      }
    }
    this.setState({ selectedList: selectedList })
  }

  //----------------------------------------------------------------------------
  // New Action
  //----------------------------------------------------------------------------

  /**
   * _handleNewOrganization handles a click to the `New` action bar button.
   */
  _handleNewClick() {
    this.setState({
      organizationFormDisplayed: true
    });
  }

  // Create list via Mesh API.
  _handleSaveOrganization(params) {
    this.props.organizationActions.createOrganization(params)
    this.setState({
      organizationFormDisplayed: false
    });
  }

  _handleCloseOrganizationForm() {
    this.setState({
      selectedOrganization: null,
      selectedOrganizationUsers: [],
      organizationFormDisplayed: false,
      orgSideDetailDisplayed: false
    });
  }

  _handleCloseUserForm() {
    this.setState({
      userSideDetailDisplayed: false
    });
  }

  //----------------------------------------------------------------------------
  // Publish Action
  //----------------------------------------------------------------------------

  /**
   * _handlePublishList handles a click to the `Publish` action bar button.
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

  _handlePublishOrganization(params) {
    let providers = [];
    this.props.providerState.providers.map(function(provider) {
      let name = provider['name']
      let shouldPublish = params[name]
      if (shouldPublish === true) {
        providers.push(provider.name)
      }
    });

    for (let idx in this.state.selectedList) {
      let organization = this.state.selectedList[idx]
      this.props.organizationActions.publishOrganization(organization, providers)
    }

    this.setState({
      selectedList: [],
      providerFormDisplayed: false
    });
  }

  _handleCloseProviderForm() {
    this.setState({
      providerFormDisplayed: false
    });
  }

  //----------------------------------------------------------------------------
  // Delete Action
  //----------------------------------------------------------------------------

  /**
   * _handleDeleteList handles a click to the `Delete` action bar button.
   */
  _handleDeleteClick() {
    if (_.keys(this.state.selectedList).length == 0) {
      this.setState({
        errorFormDisplayed: true
      });
    } else {
      this.setState({
        deleteFormDisplayed: true
      });
    }
  }

  _handleDeleteOrganization() {
    _.each(this.state.selectedList, (userId) => {
      let organization = this.state.selectedList[userId]
      this.props.organizationActions.deleteOrganization(organization)
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
  // Show Action
  //----------------------------------------------------------------------------

  _handleCellClick(idx) {
    let organization = this.state.filteredDataList.getObjectAt(idx)
    this.props.organizationActions.fetchOrganizationUsers(organization)
    Mixpanel.track('Clicked Org Row')
    this.setState({
      selectedOrganization: organization,
      organizationFormDisplayed: false,
      orgSideDetailDisplayed: true,
      userSideDetailDisplayed: false
    });
  }

  _handleUpdateOrganization(params) {
    this.props.organizationActions.updateOrganization(this.state.selectedOrganization, params)
    this.setState({
      selectedOrganization: null,
      organizationFormDisplayed: false
    });
  }

  _handleShowingSelectedUser(user) {
    this.props.userActions.requestDetailUser(user)
    Mixpanel.track('Clicked User From Org Slideout')
    this.setState({
      userSideDetailDisplayed: true,
      selectedUser: user
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
            <p>{'It looks like you don\'t have any organizations'}</p>
            <p className="bottom-instruction">{'because no integrations are turned on yet.'}</p>
            <Button bsStyle={'success'} className={'integrations-button'} onClick={this.navToIntegrations}>{'Take Me To Integrations'}</Button>
          </div>
        </div>
      </div>
    )
  }


  _contentForNoOrgs() {
    return (
      <div className="row">
        <div className="no-content col-xs-12">
          <div className="text-container">
            <h2>{'No Users Yet'}</h2>
            <p>{'It looks like you don\'t have any organizations associated'}</p>
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
        filteredDataList: this._dataList
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
      filteredDataList: new DataListWrapper(this.props.organizationState.organizations, filteredIndexes)
    });
  }

  render() {
    // Data sources.
    const { selectedList, filteredDataList, orgSideDetailDisplayed, userSideDetailDisplayed } = this.state
    const { integrationState, organizationState } = this.props

    let forms = (
      <div className={'forms'}>
        <OrganizationForm
          displayed={this.state.organizationFormDisplayed}
          onCancel={this.handleCloseOrganizationForm}
          onSave={this.handleSaveOrganization}
          onUpdate={this.handleUpdateOrganization}
          organization={this.state.selectedOrganization}
        />
        <DeleteForm
          displayed={this.state.deleteFormDisplayed}
          onCancel={this.handleCloseDeleteForm}
          onDelete={this.handleDeleteOrganization}
        />
        <IntegrationForm
          displayed={this.state.providerFormDisplayed}
          integrations={this.props.integrationState.integrations}
          onCancel={this.handleCloseProviderForm}
          onPublish={this.handlePublishOrganization}
        />
        <ErrorForm
          displayed={this.state.errorFormDisplayed}
          error={"Please Select an Organization"}
          onOK={this.handleCloseErrorForm}
        />
      </div>
    )

    // Building Organization Actions
    let newAction = { handler: this.handleNewClick, title: 'New', type: 0, glyph:'glyphicon glyphicon-plus' };
    let deleteAction = { handler: this.handleDeleteClick, title: 'Delete', type: 0, glyph: 'glyphicon glyphicon-remove' };
    let actions = [newAction, deleteAction];

    /**
     * Organization Side Panel
     */
    let orgSideDetail = null
    if (orgSideDetailDisplayed === true) {
      let org = this.state.selectedOrganization
      orgSideDetail = (
        <SideDetailView 
          detailOrg={org}
          key="org-side-detail" 
          onExit={this.handleCloseOrganizationForm}
          onSelectOrgUser={this.handleShowingSelectedUser}
          panelRelativeWidth="40%"
          providersByKey={this.props.providerState.providersByKey}
          users={this.state.selectedOrganizationUsers}
        />
      )
    }

    /**
     * User Detail Side Panel
     */
    let userSideDetail = null
    if (userSideDetailDisplayed === true) {
      let user = this.state.selectedUser
      if (this.props.userState.detailUser) {
        user = this.props.userState.detailUser
      }
      userSideDetail = (
        <SideDetailView
          detailUser={user}
          isFetchingDetailUser={this.props.userState.isFetchingDetail} 
          key="user-side-detail" 
          onExit={this.handleCloseUserForm}
          panelRelativeWidth="39%"
          providersByKey={this.props.providerState.providersByKey}
          style={{ width: '90%' }}
        />
      )
    }

    // Determine if all are selected
    const allSelected = _.keys(selectedList).length == filteredDataList.getSize()

    let columns = []

    let radioCell = (<RadioCell col="radio" data={filteredDataList} onChange={this.handleSelectOne} selectedList={selectedList} />)
    columns.push(<Column cell={radioCell} header={<RadioHeader allAreSelected={allSelected} onSelectAll={this.handleSelectAll}/>} key={'radio'} width={32}/>)

    let nameCell = (<TextCell col="name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={nameCell} header={<Cell>{'Name'}</Cell>} key={'name'} width={150}/>)

    let sizeCell = (<TextCell col="size" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={sizeCell} header={<Cell>{'Size'}</Cell>} key={'size'} width={60}/>)

    let websiteCell = (<TextCell col="website" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={websiteCell} header={<Cell>{'Website'}</Cell>} key={'website'} width={180}/>)

    let industryCell = (<TextCell col="industry" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={industryCell} header={<Cell>{'Industry'}</Cell>} key={'industry'} width={200}/>)
    let originCell = (
      <PillCell {...this.props} 
        col="origin_provider" 
        data={filteredDataList} 
        onClick={this.handleCellClick} 
        providersByKey={this.props.providerState.providersByKey}
      />
    )
    columns.push(<Column cell={originCell} header={<Cell>{'Provider'}</Cell>} key={'origin_provider'} width={140}/>)

    let descriptionCell = (<TextCell col="description" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={descriptionCell} header={<Cell>{'Description'}</Cell>}key={'description'} width={400}/>)

    // Get integration count to determine whether to show content
    const integraitonCount = integrationState.integrations.length
    const orgCount = organizationState.organizations.length
    let tableContent = null
    if (integraitonCount || orgCount) {
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
              maxHeight={680}
              rowCount={filteredDataList.getSize()}
              width={this.props.width}
              {...this.props}
            />
          </div>
        </div>
      )
    } else if (integraitonCount) {
      tableContent = this.contentForNoOrgs()
    } else {
      tableContent = this.contentForNoIntegrations()
    }

    return (
      <div className="organizations-component">
        <div className="modals-container">
          {forms}
        </div>
        <div className="detail-side-pane">
          <ReactCSSTransitionGroup transitionEnterTimeout={900} transitionLeaveTimeout={900} transitionName="org-panel">
            {orgSideDetail}
          </ReactCSSTransitionGroup>
          <ReactCSSTransitionGroup transitionEnterTimeout={900} transitionLeaveTimeout={900} transitionName="user-panel">
            {userSideDetail}
          </ReactCSSTransitionGroup>
        </div>
        {tableContent}
      </div>
    )
  }
}

// Display Name
OrganizationTable.displayName = 'Organization Table'

OrganizationTable.defaultProps = {
  organizations: [],
  width: 0
}

OrganizationTable.propTypes = {
  containerHeight: PropTypes.number,
  integrationActions : PropTypes.object.isRequired,
  integrationState: PropTypes.object.isRequired,
  organizationActions: PropTypes.object.isRequired,
  organizationState: PropTypes.object.isRequired,
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
    organizationState: state.organizations,
    providerState: state.providers,
    userState: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    integrationActions: bindActionCreators(IntegrationActions, dispatch),
    organizationActions: bindActionCreators(OrganizationActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

// Wrapping the Provider component in a HOC
const WrappedOrganizationTable = IntervalWrapper(OrganizationTable)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedOrganizationTable)
