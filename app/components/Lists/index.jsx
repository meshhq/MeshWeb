
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'
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
import { Button } from 'react-bootstrap'

// Forms
import ListForm from '../Forms/ListForm'
import DeleteForm from '../Forms/DeleteForm'
import IntegrationForm from '../Forms/IntegrationForm'
import ErrorForm from '../Forms/ErrorForm'

// Tracking 
import { trackVisitedLists } from '../../helpers/tracking'

// Actions
import * as ListActions from '../../actions/lists'

const { Column, Cell } = FixedDataTable;

/**
 * Lists represent the user lists for a application
 */
class ListTable extends Component {
  constructor(props, context) {
    super(props, context)

    // Tracking
    trackVisitedLists()

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

    // No Content
    this.contentForNoIntegrations = this._contentForNoIntegrations.bind(this)
    this.contentForNoLists = this._contentForNoLists.bind(this)
    this.navToIntegrations = this._navToIntegrations.bind(this)

    // Generate the Dta wrapper for the lists.
    this.dataList = new DataListWrapper(this.props.listState.lists)
    this.state = {
      selectedList: {},
      selectedObject: null,
      selectedIntegration: null,
      filteredDataList: this.dataList,
      listFormDisplayed: false,
      integrationFormDisplayed: false,
      deleteFormDisplayed: false,
      errorFormDisplayed: false
    }
  }

  componentWillReceiveProps(nextProps) {
    let selectedListUsers = new DataListWrapper(nextProps.listState.users)
    this.setState({
      selectedListUsers: selectedListUsers
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
      dataList = new DataListWrapper(this.props.listState.lists, filteredIndexes)
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
    selectedList[id] = true
    this.setState({
      selectedList: selectedList
    });
  }

  /**
   * handleSelectAll takes care of handling the event where all users are toggles
   * @param  {[type]} e The event
   */
  _handleSelectAll(e) {
    let selectedList = {}
    if (e.target.checked) {
      for (let idx = 0; idx < this.state.filteredDataList.getSize(); idx++) {
        const id = this.state.filteredDataList.getObjectAt(idx)
        selectedList[id] = true
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
    })
  }

  _handleCloseListForm() {
    this.setState({
      selectedObject: null,
      selectedListUsers: null,
      listFormDisplayed: false
    })
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
      })
    } else {
      this.setState({
        integrationFormDisplayed: true
      })
    }
  }

  _handlePublishList(params) {
    let integrations = [];
    this.props.integrationState.integrations.map(function(integration) {
      let name = integration['name']
      let shouldPublish = params[name]
      if (shouldPublish === true) {
        integrations.push(integration.name)
      }
    })

    for (let idx in this.state.selectedList) {
      let list = this.state.selectedList[idx]
      this.props.listActions.publishList(list, integrations)
    }

    this.setState({
      selectedList: [],
      integrationFormDisplayed: false
    })
  }

  _handleCloseIntegrationForm() {
    this.setState({
      integrationFormDisplayed: false
    })
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
      integration = this.props.integrationState.integrations.find(function(integration){
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
          this.dataList = new DataListWrapper(this.props.listState.lists)
        }
        this.setState({ filteredDataList: this.dataList })
    });

  }

  _filteredLists() {
     let lists = _.filter(this.props.listState.lists, (list) => {
      const hasName = list.hasOwnProperty('name')
      const isCurrentIntegration = list.origin_provider == this.state.selectedIntegration
      return hasName && isCurrentIntegration
    })
    return lists
  }

  _filteredIntegrations() {
    return _.filter(this.props.integrationState.integrations, (integration) =>
      integration.type == this.state.selectedIntegration.type
    )
  }

  //----------------------------------------------------------------------------
  // List Detail
  //----------------------------------------------------------------------------

  _handleCellClick(idx) {
   let list = this.state.filteredDataList.getObjectAt(idx)
   this.props.listActions.fetchListUsers(list)
   this.setState({
     selectedObject: list,
     listFormDisplayed: true
   });
  }

  _handleUpdateList(params) {
    this.props.listActions.updateList(this.state.selectedList, params)
    this.setState({
      selectedObject: null,
      selectedListUsers: null,
      listFormDisplayed: false
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
            <p>{'It looks like you don\'t have any lists'}</p>
            <p className="bottom-instruction">{'because no integrations are turned on yet.'}</p>
            <Button bsStyle={'success'} className={'integrations-button'} onClick={this.navToIntegrations}>{'Take Me To Integrations'}</Button>
          </div>
        </div>
      </div>
    )
  }

  _contentForNoLists() {
    return (
      <div className="row">
        <div className="no-content col-xs-12">
          <div className="text-container">
            <h2>{'No Lists Yet'}</h2>
            <p>{'It looks like you don\'t have any lists associated'}</p>
            <p className="bottom-instruction">{'with the integration you have activated, or they\'re still syncing.'}</p>
            <Button bsStyle={'success'} className={'integrations-button'} onClick={this.navToIntegrations}>{'Take Me To Integrations'}</Button>
          </div>
        </div>
      </div>
    )
  }

  //----------------------------------------------------------------------------
  // Render
  //----------------------------------------------------------------------------

  render() {

    // Data sources.
    const { selectedList, filteredDataList } = this.state
    const { integrationState, listState } = this.props
  
    let forms = (
      <div className={'forms'}>
        <ListForm
          displayed={this.state.listFormDisplayed}
          list={this.state.selectedObject}
          onCancel={this.handleCloseListForm}
          onSave={this.handleSaveList}
          onUpdate={this.handleUpdateList}
          users={this.state.selectedListUsers}
        />
        <DeleteForm
          displayed={this.state.deleteFormDisplayed}
          onCancel={this.handleCloseDeleteForm}
          onDelete={this.handleDeleteList}
        />
        <IntegrationForm
          displayed={this.state.integrationFormDisplayed}
          integrations={this.props.integrationState.integrations}
          onCancel={this.handleCloseIntegrationForm}
          onPublish={this.handlePublishList}
        />
        <ErrorForm
          displayed={this.state.errorFormDisplayed}
          error={"Please Select A List"}
          onOK={this.handleCloseErrorForm}
        />
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

    let originCell = (<PillCell {...this.props} col="origin_provider" data={filteredDataList} onClick={this.handleCellClick} providersByKey={this.props.providerState.providersByKey}/>)
    columns.push(<Column cell={originCell} header={<Cell>{'Provider'}</Cell>} key={'origin_provider'} width={120}/>)

    let descriptionCell = (<TextCell col="description" data={filteredDataList} onClick={this.handleCellClick}/>)
    columns.push(<Column cell={descriptionCell} header={<Cell>{'Description'}</Cell>} key={'description'} width={600} />)

    // No Content determination
    // Get integration count to determine whether to show content
    const integraitonCount = integrationState.integrations.length
    const listCount = listState.lists.length
    let tableContent = null
    if (integraitonCount && listCount) {
      tableContent = (
        <div className="active-table-content">
          <div className="action-bar">
            <ActionBar
              actions={actions}
              onSearchInput={this.handleSearch}
              providers={this.props.integrationState.integrations}
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
      tableContent = this.contentForNoLists()
    } else {
      tableContent = this.contentForNoIntegrations()
    }

    // Layout the providers table.
    return (
      <div className="users-component">
        <div className="modals-container">
          {forms}
        </div>
        {tableContent}
      </div>
    );
  }
}

// Display Name
ListTable.displayName = 'Lists'

ListTable.defaultProps = {
  currentCompany: '',
  width: 1000
}

ListTable.propTypes = {
  integrationState: PropTypes.object.isRequired,
  listActions: PropTypes.object.isRequired,
  listState: PropTypes.object.isRequired,
  listUsers: PropTypes.array,
  providerState: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
}

function mapStateToProps(state) {
  return {
    integrationState: state.integrations,
    listState: state.lists,
    providerState: state.providers
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
