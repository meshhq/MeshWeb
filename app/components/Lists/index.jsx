
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'

// Components
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import PillCell from '../Shared/DataTableCells/PillCell'
import DataListWrapper from '../Shared/DataListWrapper'
import ActionBar from '../ActionBar'

// Forms
import ListForm from '../Forms/ListForm'
import DeleteForm from '../Forms/DeleteForm'
import ProviderForm from '../Forms/ProviderForm'

// Actions
import * as ListActions from '../../actions/lists'

const { Table, Column, Cell } = FixedDataTable;

/**
 * Lists represent the user lists for a application
 */
class Lists extends Component {
  constructor(props, context) {
    super(props, context)

    // New List Handlers
    this.handleNewListClick = this._handleNewList.bind(this)
    this.handleSaveList = this._handleSaveList.bind(this)
    this.handleCloseListForm = this._handleCloseListForm.bind(this)

    // Deletion List Handlers
    this.handleDeleteListClick = this._handleDeleteListClick.bind(this)
    this.handleDeleteList = this._handleDeleteList.bind(this)
    this.handleCloseDeleteForm = this._handleCloseDeleteForm.bind(this)

    // Publish List Handlers
    this.handlePublishListClick = this._handlePublishListClick.bind(this)
    this.handlePublishList = this._handlePublishList.bind(this)
    this.handleCloseProviderForm = this._handleCloseProviderForm.bind(this)

    // Filter List Handlers
    this.handleFilterListClick = this._handleFilterListClick.bind(this)

    // Searching
    this.handleSearchLists = this._handleSearchLists.bind(this)

    // List Selection
    this.handleSelectOne = this._handleSelectOne.bind(this)
    this.handleSelectAll = this._handleSelectAll.bind(this)

    // Generate the Dta wrapper for the lists.
    this.dataList = new DataListWrapper(this.props.lists)
    this.state = {
      selectedList: [],
      selectedProvider: null,
      filteredDataList: this.dataList,
      listFormDisplayed: false,
      providerFormDisplayed: false,
      deleteFormDisplayed: false
    }
  }

  //----------------------------------------------------------------------------
  // New Actiion
  //----------------------------------------------------------------------------

  /**
   * _handleNewList handles a click to the `New` action bar button.
   */
  _handleNewList() {
    this.setState({
      listFormDisplayed: true
    });
  }

  _handleSaveList(params) {
    // Optimistically add the list to the model.
    let list = { 'name': params.name, 'description': params.description }
    this.props.lists.push(list)
    this.dataList = new DataListWrapper(this.props.lists)

    // Create list via Mesh API.
    this.props.listActions.createList(list)
    this.setState({
      filteredDataList: this.dataList,
      listFormDisplayed: false
    });
  }

  _handleCloseListForm() {
    this.setState({
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
    this.setState({
      providerFormDisplayed: true
    });
  }

  _handlePublishList(params) {
    let providers = [];
    this.props.providers.map(function(provider) {
      let type = provider['type']
      let shouldPublish = params[type]
      if (shouldPublish === true) {
        providers.push(provider.name)
      }
    });

    for (let idx in this.state.selectedList) {
      let listID = this.state.selectedList[idx]
      this.props.listActions.publishList(listID, providers)
    }

    this.setState({
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
  _handleDeleteListClick() {
    this.setState({
      deleteFormDisplayed: true
    });
  }

  _handleDeleteList() {
    for (let idx in this.state.selectedList) {
      let listID = this.state.selectedList[idx]
      this.props.lists.splice(idx, 1);
      this.props.listActions.deleteList(listID)
    }

    this.dataList = new DataListWrapper(this.props.lists)
    this.setState({
      selectedList: [],
      dataList: this.dataList,
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
   * _handleFilterList handles a click to the `Provider` action bar button.
   */
  _handleFilterListClick(idx) {
    // Update provider state.
    let provider
    let providerType
    if (idx) {
      provider = this.props.providers.find(function(provider){
        return provider.type === idx
      });
      providerType = provider.type
    }

    this.setState(
      { selectedProvider: providerType },
      function () {
        if (this.state.selectedProvider) {
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
      const isCurrentProvider = list.origin_provider == this.state.selectedProvider
      return hasName && isCurrentProvider
    })
    return lists
  }

  _filteredProviders() {
    return _.filter(this.props.providers, (provider) => {
      return provider.type == this.state.selectedProvider.type
    })
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
  // List Detail
  //----------------------------------------------------------------------------

  /**
   * _handleShowListDetail handles a click on the actual list in the table.
   */
  _handleShowListDetail() {
    /*
      1. Present the list detail view.
     */
  }

  //----------------------------------------------------------------------------
  // List Searching
  //----------------------------------------------------------------------------

  _handleSearchLists(e) {
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
    const id = this.props.lists[idx].id
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
      for (let idx in this.props.filteredDataList) {
        const id = this.props.filteredDataList[idx].id
        selectedList.push(id)
      }
    }
    this.setState({
      selectedList: selectedList
    });
  }

  render() {

    // Setting up our action bar.
    let newAction = { handler: this.handleNewListClick, title: 'New', type: 0 };
    let publishAction = { handler: this.handlePublishListClick, title: 'Publish', type: 0 };
    let deleteAction = { handler: this.handleDeleteListClick, title: 'Delete', type: 0 };
    let filterAction = { handler: this.handleFilterListClick, title: 'Select Provider', type: 1 };
    let actions = [newAction, publishAction, deleteAction, filterAction];

    // Data sources.
    const { selectedList, filteredDataList } = this.state

    // Setup Out Cells
    let selectAllHeader = (<Cell>
      <div className="input-group">
        <input aria-label="..." onChange={this.handleSelectAll} type="checkbox"/>
      </div>
    </Cell>)
    let radioCell = (<RadioCell col="radio" data={filteredDataList} onChange={this.handleSelectOne} selectedList={selectedList} />)
    let nameCell = (<TextCell col="name" data={filteredDataList} />)
    let idCell = (<TextCell col="id" data={filteredDataList} />)
    let originCell = (<PillCell {...this.props} col="origin_provider" data={filteredDataList}/>)
    let descriptionCell = (<TextCell col="description" data={filteredDataList}/>)

    // Layout the providers table.
    return (
      <div className="data-table">
        <div className="row table-wrapper">
          <div className="col-md-12 dataTableWrapper">
            <ActionBar actions={actions} onSearchInput={this.handleSearchLists} providers={this.props.providers}/>
            <ListForm displayed={this.state.listFormDisplayed} onCancel={this.handleCloseListForm} onSave={this.handleSaveList}/>
            <DeleteForm displayed={this.state.deleteFormDisplayed} onCancel={this.handleCloseDeleteForm} onDelete={this.handleDeleteList}/>
            <ProviderForm displayed={this.state.providerFormDisplayed} onCancel={this.handleCloseProviderForm} onPublish={this.handlePublishList} providers={this.props.providers} />
            <Table
              headerHeight={42}
              height={1000}
              rowHeight={42}
              rowsCount={filteredDataList.getSize()}
              width={1200}
              {...this.props}
            >
              <Column cell={radioCell} header={selectAllHeader} width={32}/>
              <Column cell={nameCell} header={<Cell>{'Name'}</Cell>} width={200}/>
              <Column cell={idCell} header={<Cell>{'ID'}</Cell>} width={210}/>
              <Column cell={originCell} header={<Cell>{'Provider'}</Cell>} width={100}/>
              <Column cell={descriptionCell} header={<Cell>{'Description'}</Cell>} width={600} />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

Lists.defaultProps = {
  currentCompany: '',
  lists: []
}

Lists.propTypes = {
  listActions: PropTypes.object.isRequired,
  lists: PropTypes.array.isRequired,
  providers: PropTypes.array.isRequired
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
)(Lists)

// Display Name
Lists.displayName = 'Lists'
