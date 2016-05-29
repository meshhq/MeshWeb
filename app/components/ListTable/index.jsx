
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
import { Grid } from 'react-bootstrap'

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
import ListForm from '../Forms/ListForm'
import DeleteForm from '../Forms/DeleteForm'
import IntegrationForm from '../Forms/IntegrationForm'
import ErrorForm from '../Forms/ErrorForm'

// Actions
import * as ListActions from '../../actions/lists'

const { Column, Cell } = FixedDataTable;

/**
 * Lists represent the user lists for a application
 */
class ListTable extends Component {
  constructor(props, context) {
    super(props, context)

    // List Selection
    this.handleSelectOne = this._handleSelectOne.bind(this)
    this.handleSelectAll = this._handleSelectAll.bind(this)

    // New List Handlers
    this.handleNewClick = this._handleNewClick.bind(this)
    this.handleSaveList = this._handleSaveList.bind(this)
    this.handleCloseListForm = this._handleCloseListForm.bind(this)

    // Deletion List Handlers
    this.handleDeleteListClick = this._handleDeleteListClick.bind(this)
    this.handleDeleteList = this._handleDeleteList.bind(this)
    this.handleCloseDeleteForm = this._handleCloseDeleteForm.bind(this)

    // Publish List Handlers
    this.handlePublishListClick = this._handlePublishListClick.bind(this)
    this.handlePublishList = this._handlePublishList.bind(this)
    this.handleCloseIntegrationForm = this._handleCloseIntegrationForm.bind(this)

    // Cell Selection
    this.handleCellClick = this._handleCellClick.bind(this)
    this.handleUpdateList = this._handleUpdateList.bind(this)

    // Filter List Handlers
    this.handleFilterListClick = this._handleFilterListClick.bind(this)

    // Searching
    this.handleSearch = this._handleSearch.bind(this)

    // Errors
    this.handleCloseErrorForm = this._handleCloseErrorForm.bind(this)

    // Generate the Dta wrapper for the lists.
    this.dataList = new DataListWrapper(this.props.lists)
    this.state = {
      selectedList: [],
      selectedObject: null,
      selectedIntegration: null,
      filteredDataList: this.dataList,
      listFormDisplayed: false,
      integrationFormDisplayed: false,
      deleteFormDisplayed: false,
      errorFormDisplayed: false
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
      dataList = new DataListWrapper(this.props.lists, filteredIndexes)
    } else {
      dataList = this.dataList
    }
    this.setState({
      filteredDataList: dataList
    });
  }

  //----------------------------------------------------------------------------
  // List Selection
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
  // New Actiion
  //----------------------------------------------------------------------------

  // _handleNewClick handles a click to the `New` action bar button.
  _handleNewClick() {
    this.setState({
      listFormDisplayed: true
    });
  }

  // _handleSaveList createa new list via Mesh API.
  _handleSaveList(params) {
    this.props.listActions.createList(params)
    this.setState({
      listFormDisplayed: false
    });
  }

  _handleCloseListForm() {
    this.setState({
      selectedObject: null,
      listFormDisplayed: false
    });
  }

  //----------------------------------------------------------------------------
  // Publish Action
  //----------------------------------------------------------------------------

  /**
   * _handlePublishList handles a click to the `Publish` action bar button.
   */
  _handlePublishListClick() {
    if (this.state.selectedList.length == 0) {
      this.setState({
        errorFormDisplayed: true
      });
    } else {
      this.setState({
        integrationFormDisplayed: true
      });
    }
  }

  _handlePublishList(params) {
    let integrations = [];
    this.props.integrations.map(function(integration) {
      let name = integration['name']
      let shouldPublish = params[name]
      if (shouldPublish === true) {
        integrations.push(integration.name)
      }
    });

    for (let idx in this.state.selectedList) {
      let list = this.state.selectedList[idx]
      this.props.listActions.publishList(list, integrations)
    }

    this.setState({
      selectedList: [],
      integrationFormDisplayed: false
    });
  }

  _handleCloseIntegrationForm() {
    this.setState({
      integrationFormDisplayed: false
    });
  }

  //----------------------------------------------------------------------------
  // Delete Action
  //----------------------------------------------------------------------------

  /**
   * _handleDeleteList handles a click to the `Delete` action bar button.
   */
  _handleDeleteListClick() {
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

  _handleDeleteList() {
    for (let idx in this.state.selectedList) {
      let list = this.state.selectedList[idx]
      this.props.listActions.deleteList(list)
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
  // Filter Action
  //----------------------------------------------------------------------------

  /**
   * _handleFilterList handles a click to the `Integration` action bar button.
   */
  _handleFilterListClick(idx) {
    // Update integration state.
    let integration
    let integrationType
    if (idx) {
      integration = this.props.integrations.find(function(integration){
        return integration.type === idx
      });
      integrationType = integration.type
    }

    this.setState(
      { selectedIntegration: integrationType },
      function () {
        if (this.state.selectedIntegration) {
          let filteredLists = this._filteredLists()
          this.dataList = new DataListWrapper(filteredLists)
        } else {
          this.dataList = new DataListWrapper(this.props.lists)
        }
        this.setState({ filteredDataList: this.dataList })
    });

  }

  _filteredLists() {
     let lists = _.filter(this.props.lists, (list) => {
      const hasName = list.hasOwnProperty('name')
      const isCurrentIntegration = list.origin_provider == this.state.selectedIntegration
      return hasName && isCurrentIntegration
    })
    return lists
  }

  _filteredIntegrations() {
    return _.filter(this.props.integrations, (integration) => {
      return integration.type == this.state.selectedIntegration.type
    })
  }

  //----------------------------------------------------------------------------
  // List Detail
  //----------------------------------------------------------------------------

  _handleCellClick(idx) {
   let list = this.state.filteredDataList.getObjectAt(idx)
   this.setState({
     selectedObject: list,
     listFormDisplayed: true
   });
  }

  _handleUpdateList(params) {
    this.props.listActions.updateList(this.state.selectedList, params)
    this.setState({
      selectedObject: null,
      listFormDisplayed: false
    });
  }

  render() {

    // Data sources.
    const { selectedList, filteredDataList } = this.state

    let forms = (
      <div className={'forms'}>
        <ListForm displayed={this.state.listFormDisplayed} list={this.state.selectedObject} onCancel={this.handleCloseListForm} onSave={this.handleSaveList} onUpdate={this.handleUpdateList}/>
        <DeleteForm displayed={this.state.deleteFormDisplayed} onCancel={this.handleCloseDeleteForm} onDelete={this.handleDeleteList}/>
        <IntegrationForm displayed={this.state.integrationFormDisplayed} integrations={this.props.integrations} onCancel={this.handleCloseIntegrationForm} onPublish={this.handlePublishList}  />
        <ErrorForm displayed={this.state.errorFormDisplayed} error={"Please Select A List"} onOK={this.handleCloseErrorForm}/>
      </div>
    )

    // Building The List Actions
    let newAction = { handler: this.handleNewClick, title: 'New', type: 0, glyph:'glyphicon glyphicon-plus' };
    let publishAction = { handler: this.handlePublishListClick, title: 'Publish', type: 0, glyph:'glyphicon glyphicon-refresh' };
    let deleteAction = { handler: this.handleDeleteListClick, title: 'Delete', type: 0, glyph: 'glyphicon glyphicon-remove' };
    let filterAction = { handler: this.handleFilterListClick, title: 'Select Integration', type: 1, glyph: 'glyphicon glyphicon-filter' };
    let actions = [newAction, publishAction, deleteAction, filterAction];

    let columns = []

    let radioCell = (<RadioCell col="radio" data={filteredDataList} onChange={this.handleSelectOne} selectedList={selectedList} />)
    columns.push(<Column cell={radioCell} header={<RadioHeader onSelectAll={this.handleSelectAll}/>} key={'radio'} width={32}/>)

    let nameCell = (<TextCell col="name" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={nameCell} header={<Cell>{'Name'}</Cell>} key={'name'} width={200}/>)

    let userCountCell = (<TextCell col="user_count" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={userCountCell} header={<Cell>{'User Count'}</Cell>} key={'user_count'} width={100}/>)

    let originCell = (<PillCell {...this.props} col="origin_provider" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={originCell} header={<Cell>{'Provider'}</Cell>} key={'origin_provider'} width={120}/>)

    let descriptionCell = (<TextCell col="description" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={descriptionCell} header={<Cell>{'Description'}</Cell>} key={'description'} width={600} />)

    // Layout the providers table.
    return (
      <Grid fluid>
        {forms}
        <ActionBar
          actions={actions}
          onSearchInput={this.handleSearch}
          providers={this.props.integrations}
        />
        <DataTable
          columns={columns}
          headerHeight={40}
          height={700}
          rowCount={filteredDataList.getSize()}
          rowHeight={35}
          width={this.props.width}
          {...this.props}
        />
      </Grid>
    );
  }
}

// Display Name
ListTable.displayName = 'Lists'

ListTable.defaultProps = {
  currentCompany: '',
  lists: []
}

ListTable.propTypes = {
  integrations: PropTypes.array.isRequired,
  listActions: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,
  providers: PropTypes.array.isRequired,
  width: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    listState: state.lists
  }
}

function mapDispatchToProps(dispatch) {
  return {
    listActions: bindActionCreators(ListActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ListTable)
