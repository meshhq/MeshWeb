
import React, { Component, PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { ToastContainer, ToastMessage } from 'react-toastr'
import { Grid, Row, Col } from 'react-bootstrap'

// Components
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import PillCell from '../Shared/DataTableCells/PillCell'
import DataListWrapper from '../Shared/DataListWrapper'
import ActionBar from '../ActionBar'

// Forms
import OrganizationForm from '../Forms/OrganizationForm'
import DeleteForm from '../Forms/DeleteForm'
import IntegrationForm from '../Forms/IntegrationForm'
import ErrorForm from '../Forms/ErrorForm'

// Actions
import * as OrganizationActions from '../../actions/organizations'

const { Table, Column, Cell } = FixedDataTable;
const ToastMessageFactory = React.createFactory(ToastMessage.animation);

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
    this.dataList = new DataListWrapper(this.props.organizations)
    this.state = {
      selectedList: [],
      selectedOrganization: null,
      selectedProvider: null,
      filteredDataList: this.dataList,
      organizationFormDisplayed: false,
      providerFormDisplayed: false,
      deleteFormDisplayed: false,
      errorFormDisplayed: false
    };
  }

  componentWillReceiveProps(nextProps) {
    this._dataList = new DataListWrapper(nextProps.organizations)
    this.setState({
      filteredDataList: this._dataList
    });
  }

  /**
   * Synthetic provider injected into the provider selection list
   */
  _meshProvider() {
    return {
      name: 'Mesh',
      type: 0
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
      let size = this.dataList.getSize();
      let filteredIndexes = [];
      for (let index = 0; index < size; index++) {
        let { name } = this.dataList.getObjectAt(index);
        if (name.toLowerCase().indexOf(filterBy) !== -1) {
          filteredIndexes.push(index);
        }
      }
      dataList = new DataListWrapper(this.props.organizations, filteredIndexes)
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
    let organization = { 'name': params.name, 'description': params.description }
    this.props.organizationActions.createOrganization(organization)
    this.setState({
      organizationFormDisplayed: false
    });
  }

  _handleCloseOrganizationForm() {
    this.setState({
      selectedOrganization: null,
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
    this.props.providers.map(function(provider) {
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
      filteredDataList: new DataListWrapper(this.props.organizations, filteredIndexes)
    });
  }

  render() {
    // Data sources.
    const { selectedList, filteredDataList } = this.state

    // Building Organization Actions
    let newAction = { handler: this.handleNewClick, title: 'New', type: 0 };
    let publishAction = { handler: this.handlePublishClick, title: 'Publish', type: 0 };
    let deleteAction = { handler: this.handleDeleteClick, title: 'Delete', type: 0 };
    let actions = [newAction, publishAction, deleteAction];
    let actionDivs = (
      <div className={'actions'}>
        <ToastContainer className={'toast-top-full-width'} ref={'container'} toastMessageFactory={ToastMessageFactory} />
        <ActionBar actions={actions} onSearchInput={this.handleSearch} providers={this.props.providers}/>
        <OrganizationForm displayed={this.state.organizationFormDisplayed} onCancel={this.handleCloseOrganizationForm} onSave={this.handleSaveOrganization} onUpdate={this.handleUpdateOrganization} organization={this.state.selectedOrganization}/>
        <DeleteForm displayed={this.state.deleteFormDisplayed} onCancel={this.handleCloseDeleteForm} onDelete={this.handleDeleteOrganization}/>
        <IntegrationForm displayed={this.state.providerFormDisplayed} integrations={this.props.integrations} onCancel={this.handleCloseProviderForm} onPublish={this.handlePublishOrganization}  />
        <ErrorForm displayed={this.state.errorFormDisplayed} error={"Please Select an Organization"} onOK={this.handleCloseErrorForm}/>
      </div>
    )

    // Setup Cells
    let selectAllHeader = (<Cell>
      <div className="input-group">
        <input aria-label="..." onChange={this.handleSelectAll} type="checkbox"/>
      </div>
    </Cell>)
    let radioCell = (<RadioCell col="radio" data={filteredDataList} onChange={this.handleSelectOne} selectedList={selectedList} />)
    let nameCell = (<TextCell col="name" data={filteredDataList} onClick={this.handleCellClick}/>)
    let descriptionCell = (<TextCell col="description" data={filteredDataList} onClick={this.handleCellClick}/>)
    let sizeCell = (<TextCell col="size" data={filteredDataList} onClick={this.handleCellClick}/>)
    let industryCell = (<TextCell col="industry" data={filteredDataList} onClick={this.handleCellClick}/>)
    let websiteCell = (<TextCell col="website" data={filteredDataList} onClick={this.handleCellClick}/>)
    let originCell = (<PillCell {...this.props} col="origin_provider" data={filteredDataList} onClick={this.handleCellClick}/>)

    return (
      <Grid fluid>
        {actionDivs}
        <Row className="data-table-row">
          <Col className="data-table-column" md={12}>
            <Table headerHeight={50} height={1000} rowHeight={35} rowsCount={filteredDataList.getSize()} width={this.props.width} {...this.props} >
              <Column cell={radioCell} header={selectAllHeader} width={32} />
              <Column cell={nameCell} header={<Cell>{'Name'}</Cell>} width={150} />
              <Column cell={sizeCell} header={<Cell>{'Size'}</Cell>} width={60} />
              <Column cell={websiteCell} header={<Cell>{'Website'}</Cell>} width={180} />
              <Column cell={industryCell} header={<Cell>{'Industry'}</Cell>} width={200} />
              <Column cell={originCell} header={<Cell>{'Provider'}</Cell>} width={140}/ >
              <Column cell={descriptionCell} header={<Cell>{'Description'}</Cell>} width={400} />
            </Table>
          </Col>
        </Row>
      </Grid>
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
  integrations: PropTypes.array.isRequired,
  organizationActions: PropTypes.object.isRequired,
  organizations: PropTypes.arrayOf(React.PropTypes.object).isRequired,
  providers: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    organizationState: state.organizations
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
