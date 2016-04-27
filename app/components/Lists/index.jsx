
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
    /**
     * Generates the list of providers to show in the dropdown.
     */
     // KC Note: I think we should actually ask the server for the customers activated integrations here.
     // Gets rid of all the logic below.
    const providerTypesPresentInLists = _.pluck(this.props.lists, 'origin_provider')
    const uniqProviderTypesPresentInLists = _.uniq(providerTypesPresentInLists)
    const filteredProviders = _.filter(this.props.providers, (provider) => {
      return _.indexOf(uniqProviderTypesPresentInLists, provider.type) != -1
    })
    filteredProviders.push(this._meshProvider())

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

    this.handleFilterListClick = this._handleFilterList.bind(this)
    this.handleSearchListClick = this._handleSearchList.bind(this)


    // Generate the Dta wrapper for the lists.
    this.dataList = new DataListWrapper(this.props.lists)
    this.state = {
      filteredDataList: this.dataList,
      selectedLists: {},
      filteredProviders: filteredProviders,
      selectedProvider: _.last(filteredProviders),
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

  _handleSaveList(element, params) {
    this.props.listActions.createList(params)
    this.setState({
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

  _handlePublishList(element, params) {
    this.props.listActions.publishList(params)
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

  _handleDeleteList(element, listID) {
    this.props.listActions.deleteList(listID)
    this.setState({
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
  _handleFilterList() {

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
  // List Filtering
  //----------------------------------------------------------------------------

  _handleSearchList() {

  }

  _listsFilteredByCurrentIntegration() {
    const lists = this.props.lists;
    return _.filter(lists, (list) => { list.integraitonId === this.state.selectedIntegration.id })
  }

  _providerSelected(provider) {
    this.setState({ selectedProvider: provider })
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

  render() {
    // Setting up our action bar.
    let newAction = { handler: this.handleNewListClick, title: 'New', type: 0 };
    let publishAction = { handler: this.handlePublishListClick, title: 'Publish', type: 0 };
    let deleteAction = { handler: this.handleDeleteListClick, title: 'Delete', type: 0 };
    let filterAction = { handler: this.handleFilterListClick, title: 'Select Provider', type: 1 };
    let actions = [newAction, publishAction, deleteAction, filterAction];

    // MAKE PANELS
    const { selectedLists, filteredDataList } = this.state
    const providersForDropdown = _.filter(this.state.filteredProviders, (provider) => {
      return provider.type != this.state.selectedProvider.type
    })

    // Building the drop down top left sort
    let providerSortList = []
    for (let i = 0; i < providersForDropdown.length; i++) {

      const provider = providersForDropdown[i]
      const providerClicked = this._providerSelected.bind(this, provider)
      providerSortList.push(
        <li>
          <a href="#"
            key={provider.name}
            onClick={providerClicked}
          >
          {provider.name}
          </a>
        </li>
      )
    }

    // Building the drop down top left sort
    // const filteredLists = _.filter(this.props.lists, (list) => {
    //   const hasName = list.hasOwnProperty('name')
    //   const isCurrentProvider = list.origin_provider == this.state.selectedProvider.type
    //   return hasName && isCurrentProvider
    // })

    // Layout the providers in a row
    return (
      <div className="data-table">
        <div className="row table-wrapper">
          <div className="col-md-12 dataTableWrapper">
            <ActionBar
              actions={actions}
              onSearchInput={this.handleSearchListClick}
            />
            <ListForm displayed={this.state.listFormDisplayed} onCancel={this.handleCloseListForm} onSave={this.handleSaveList} />
            <DeleteForm displayed={this.state.deleteFormDisplayed} onCancel={this.handleCloseDeleteForm} onDelete={this.handleDeleteList} />
            <ProviderForm
              logoSrc={'//logo.clearbit.com/spotify.com'}
              displayed={this.state.providerFormDisplayed}
              onCancel={this.handleCloseProviderForm}
              onPublish={this.handlePublishList} />
            <Table
              headerHeight={42}
              height={1000}
              rowHeight={42}
              rowsCount={filteredDataList.getSize()}
              width={1200}
              {...this.props}
            >
              <Column
                cell={<RadioCell
                  col="radio"
                  data={filteredDataList}
                  selectedList={selectedLists}
                      />}
                header={<Cell>
                  <div className="input-group">
                    <input
                      aria-label="..."
                      onChange={this.handleToggleAll}
                      type="checkbox"
                    />
                  </div></Cell>}
                width={32}
              />
              <Column
                cell={<TextCell
                  col="name"
                  data={filteredDataList}
                      />}
                header={<Cell>{'Name'}</Cell>}
                width={200}
              />
              <Column
                cell={<TextCell
                  col="id"
                  data={filteredDataList}
                      />}
                header={<Cell>{'ID'}</Cell>}
                width={210}
              />
              <Column
                cell={
                  <PillCell
                    {...this.props}
                    col="origin_provider"
                    data={filteredDataList}
                  />}
                header={<Cell>{'Provider'}</Cell>}
                width={100}
              />
              <Column
                cell={<TextCell
                  col="description"
                  data={filteredDataList}
                      />}
                header={<Cell>{'Description'}</Cell>}
                width={600}
              />
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
