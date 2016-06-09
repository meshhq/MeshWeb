
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import RadioHeader from '../Shared/DataTableHeaders/RadioHeader'
import PillCell from '../Shared/DataTableCells/PillCell'
import DataListWrapper from '../Shared/DataListWrapper'
import ActionBar from '../ActionBar'
import DataTable from '../Shared/DataTable'

// Forms
import OrganizationForm from '../Forms/OrganizationForm'
import DeleteForm from '../Forms/DeleteForm'
import IntegrationForm from '../Forms/IntegrationForm'
import ErrorForm from '../Forms/ErrorForm'

// Actions
import * as OrganizationActions from '../../actions/organizations'

const { Column, Cell } = FixedDataTable;

class OrganizationTable extends Component {
  constructor(props) {
    super(props);

    // Organization Selection
    this.handleSelectOne = this._handleSelectOne.bind(this)
    this.handleSelectAll = this._handleSelectAll.bind(this)

    // New Organization Handlers
    this.handleNewClick = this._handleNewClick.bind(this)
    this.handleSaveOrganization = this._handleSaveOrganization.bind(this)
    this.handleCloseOrganizationForm = this._handleCloseOrganizationForm.bind(this)

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

    // Searching
    this.handleSearch = this._handleSearch.bind(this)

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
      selectedList: [],
      selectedOrganization: null,
      selectedOrganizationUsers: [],
      selectedProvider: null
    };
  }

  componentWillReceiveProps(nextProps) {
    let selectedOrganizationUsers = new DataListWrapper(nextProps.organizationState.users)
    this.setState({
      selectedOrganizationUsers: selectedOrganizationUsers
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
  // List Searching
  //----------------------------------------------------------------------------

  _handleSearch(e) {
    let dataList;
    if (e.target.value) {
      let filterBy = e.target.value.toLowerCase();
      let size = this.dataList.getSize();
      let filteredIndexes = [];
      for (let index = 0; index < size; index++) {
        let { name } = this.dataList.getObjectAt(index);
        if (name.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
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
    const id = this.state.filteredDataList.getObjectAt(idx)
    if (e.target.checked) {
      selectedList.push(id)
    } else {
      selectedList.pop(id)
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
        const id = this.state.filteredDataList.getObjectAt(idx)
        selectedList.push(id)
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
      organizationFormDisplayed: false
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

  _handleDeleteOrganization() {
    for (let idx in this.state.selectedList) {
      let organization = this.state.selectedList[idx]
      this.props.organizationActions.deleteOrganization(organization)
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
  // Show Action
  //----------------------------------------------------------------------------

  _handleCellClick(idx) {
    let organization = this.state.filteredDataList.getObjectAt(idx)
    this.props.organizationActions.fetchOrganizationUsers(organization)
    this.setState({
      selectedOrganization: organization,
      organizationFormDisplayed: true
    });
  }

  _handleUpdateOrganization(params) {
    this.props.organizationActions.updateOrganization(this.state.selectedOrganization, params)
    this.setState({
      selectedOrganization: null,
      organizationFormDisplayed: false
    });
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
    const { selectedList, filteredDataList } = this.state

    let forms = (
      <div className={'forms'}>
        <OrganizationForm
          displayed={this.state.organizationFormDisplayed}
          onCancel={this.handleCloseOrganizationForm}
          onSave={this.handleSaveOrganization}
          onUpdate={this.handleUpdateOrganization}
          organization={this.state.selectedOrganization}
          users={this.state.selectedOrganizationUsers}
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
    let publishAction = { handler: this.handlePublishClick, title: 'Publish', type: 0, glyph:'glyphicon glyphicon-refresh' };
    let deleteAction = { handler: this.handleDeleteClick, title: 'Delete', type: 0, glyph: 'glyphicon glyphicon-remove' };
    let actions = [newAction, publishAction, deleteAction];

    let columns = []

    let radioCell = (<RadioCell col="radio" data={filteredDataList} onChange={this.handleSelectOne} selectedList={selectedList} />)
    columns.push(<Column cell={radioCell} header={<RadioHeader onSelectAll={this.handleSelectAll}/>} key={'radio'} width={32}/>)

    let nameCell = (<TextCell col="name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={nameCell} header={<Cell>{'Name'}</Cell>} key={'name'} width={150}/>)

    let sizeCell = (<TextCell col="size" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={sizeCell} header={<Cell>{'Size'}</Cell>} key={'size'} width={60}/>)

    let websiteCell = (<TextCell col="website" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={websiteCell} header={<Cell>{'Website'}</Cell>} key={'website'} width={180}/>)

    let industryCell = (<TextCell col="industry" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={industryCell} header={<Cell>{'Industry'}</Cell>} key={'industry'} width={200}/>)

    let originCell = (<PillCell {...this.props} col="origin_provider" data={filteredDataList} onClick={this.handleCellClick} providers={this.props.providerState.providers}/>)
    columns.push(<Column cell={originCell} header={<Cell>{'Provider'}</Cell>} key={'origin_provider'} width={140}/>)

    let descriptionCell = (<TextCell col="description" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={descriptionCell} header={<Cell>{'Description'}</Cell>}key={'description'} width={400}/>)

    return (
      <div className="organizations-component">
        <div className="modals-container">
          {forms}
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
            maxHeight={680}
            rowCount={filteredDataList.getSize()}
            width={this.props.width}
            {...this.props}
          />
        </div>
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
  integrationState: PropTypes.object.isRequired,
  organizationActions: PropTypes.object.isRequired,
  organizationState: PropTypes.object.isRequired,
  providerState: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    integrationState: state.integrations,
    organizationState: state.organizations,
    providerState: state.providers
  }
}

function mapDispatchToProps(dispatch) {
  return {
    organizationActions: bindActionCreators(OrganizationActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(OrganizationTable)
