
import React, { PropTypes, Component } from 'react'
import _ from 'underscore'

// Components
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import PillCell from '../Shared/DataTableCells/PillCell'
import DataListWrapper from '../Shared/DataListWrapper'

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

    // Generate the Dta wrapper for the lists.
    this.dataList = new DataListWrapper(this.props.lists)
    this.state = {
      filteredDataList: this.dataList,
      selectedLists: {},
      filteredProviders: filteredProviders,
      selectedProvider: _.last(filteredProviders)
    }
  }

  //****************************************************************************
  // Action Bar Handlers
  //****************************************************************************

  _handleActionClick(idx) {
    switch(idx) {
    case 0:
        // Select All
        break;
    case 1:
        // Show form
        break;
    case 2:

        break;
    case 3:
        // Merge
        break;
    case 4:
        // More
        break;
      }
  }

  /**
   * _handleNewList handles a click to the `New` action bar button.
   */
  _handleNewList() {
    /*
      1. Present form for List data entry.
      2. Optimistically add list model to data source.
      2. Add the list via API.
     */
  }

  /**
   * _handlePublishList handles a click to the `Publish` action bar button.
   */
  _handlePublishlist() {
    /*
      1. Present integration view with options to select one or multiple integtrations.
      2. Publish the list to the selected integrations.
     */
  }

  /**
   * _handleDeleteList handles a click to the `Delete` action bar button.
   */
  _handleDeleteList() {
    /*
      1. Present deletion confirmation box.
      2. Optimistically delete list from data source.
      2. Delete the list via Mesh API.
     */
  }

  //****************************************************************************
  // List Detail
  //****************************************************************************

  /**
   * _handleShowListDetail handles a click on the actual list in the table.
   */
  _handleShowListDetail() {
    /*
      1. Present the list detail view.
     */
  }

  //****************************************************************************
  // List Filtering
  //****************************************************************************

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
    const filteredLists = _.filter(this.props.lists, (list) => {
      const hasName = list.hasOwnProperty('name')
      const isCurrentProvider = list.origin_provider == this.state.selectedProvider.type
      return hasName && isCurrentProvider
    })

    // Layout the providers in a row
    return (
      <div className="data-table">
        <div className="row table-wrapper">
          <div className="col-md-12 dataTableWrapper">
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
                cell={<PillCell
                  col="origin_provider"
                  data={filteredDataList}
                      />}
                header={<Cell>{'Provider'}</Cell>}
                width={200}
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
  lists: PropTypes.array.isRequired,
  providers: PropTypes.array.isRequired
}

// Display Name
Lists.displayName = 'Lists'

export default Lists
