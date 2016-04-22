
import React, { PropTypes } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'

// Components
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import DataListWrapper from '../Shared/DataListWrapper'
import ActionBar from '../ActionBar'


// Actions
import * as UserActions from '../../actions/users'

const { Table, Column, Cell } = FixedDataTable;

const TextColumn = ({ data, ...props }) => {
  this.displayName = 'TextColumn'
  let cell = <TextCell {...props} col="test" data={data}/>
  let headerCell = <Cell {...props}>{'Test'}</Cell>

  return (
    <Column cell={cell} header={headerCell} width={150}/>
  )
}

class UsersTable extends React.Component {
  constructor(props) {
    super(props);

    // Method binding boiler plate.
    this.handleOnFilterChange = this._handleOnFilterChange.bind(this);
    this.handleActionClick = this._handleActionClick.bind(this)
    this.handleToggleAll = this._handleToggleAll.bind(this);

    // Setup our data model.
    this.dataList = new DataListWrapper(this.props.users.users)

    // Setup our state.
    this.state = {
      filteredDataList: this.dataList,
      selectedList: {}
    };
  }

  componentWillReceiveProps(nextProps) {
    // KC Note. Why set out state again here?
    this.dataList = new DataListWrapper(nextProps.users.users)
    this.setState({
      filteredDataList: this.dataList
    });
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
   * _handleNewUser handles a click to the `New` action bar button.
   */
  _handleNewUser() {
    /*
      1. Present for user data entry.
      2. Optimistically add user model to data source.
      2. Add the user via API.
     */
  }

  /**
   * _handleMergeUsers handles a click to the `Merge` action bar button.
   */
  _handleMergeUsers() {
    /*
      1. Present for user data merge. Show side by side user values.
     */
  }

  /**
   * _handlePublishUser handles a click to the `Publish` action bar button.
   */
  _handlePublishUser() {
    /*
      1. Present integration view with options to select one or multiple integtrations.
      2. Publish the user to the selected integrations.
     */
  }

  /**
   * _handleAddUser handles a click to the `Add` action bar button.
   */
  _handleAddUser() {
    /*
      1. Present view to select type of either list or company.
      2. Present view to select from companies or lists.
      3. Add the user to the company or list.
     */
  }

  /**
   * _handleDeleteUser handles a click to the `Delete` action bar button.
   */
  _handleDeleteUser() {
    /*
      1. Present deletion confirmation box.
      2. Optimistically delete user from data source.
      2. Delete the user via Mesh API.
     */
  }

  //****************************************************************************
  // User Detail
  //****************************************************************************

  /**
   * _handleShowUserDetail handles a click on the actual list in the table.
   */
  _handleShowUserDetail() {
    /*
      1. Present the user detail view.
     */
  }

  //****************************************************************************
  // User Filtering
  //****************************************************************************

  /**
   * _handleOnFilterChange is the callback for all changes to the text filter
   * @param  {[type]} e The Event
   */
  _handleOnFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this.dataList
      });
    }

    // KC Note: I think we are going to want to query the server as opposed to
    //  an in memory sort.
    let filterBy = e.target.value.toLowerCase();
    let size = this.dataList.getSize();
    let filteredIndexes = [];
    for (let index = 0; index < size; index++) {
      let { first_name } = this.dataList.getObjectAt(index);
      if (first_name.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      filteredDataList: new DataListWrapper(this.props.users.users, filteredIndexes)
    });
  }

  //****************************************************************************
  // Toggle All Handler
  //****************************************************************************

  /**
   * _handleToggleAll takes care of handling the event where all users are toggles
   * @param  {[type]} e The event
   */
  _handleToggleAll(e) {
    // If the input is toggled off, then wipe the selected list
    if (!e.target.checked) {
      this.setState({
        selectedList: {}
      });
    } else {
      // Copy over all IDs
      let selectedList = {}
      for (let idx in this.props.users.users) {
        const id = this.props.users.users[idx].id
        selectedList[id] = true
      }

      // Set new State
      this.setState({
        selectedList: selectedList
      });
    }
  }

  render() {
    // Setting up our action bar.
    let newAction = { handler: this.handleActionClick, title: 'New', type: 0 };
    let publishAction = { handler: this.handleActionClick, title: 'Publish', type: 0 };
    let addAction = { handler: this.handleActionClick, title: 'Add To', type: 0 };
    let deleteAction = { handler: this.handleActionClick, title: 'Delete', type: 0 };
    let actions = [newAction, publishAction, addAction, deleteAction];

    const { filteredDataList, selectedList  } = this.state
    return (

      <div className="data-table">
        <div className="row table-wrapper">
          <div className="col-md-12 dataTableWrapper">
            <ActionBar
              actions={actions}
              onSearchInput={this.handleOnFilterChange}
            />
            <Table
              headerHeight={40}
              height={800}
              rowHeight={35}
              rowsCount={filteredDataList.getSize()}
              width={this.props.width}
              {...this.props}
            >
              <TextColumn data={filteredDataList}/>
              <Column
                cell={<RadioCell
                  col="radio"
                  data={filteredDataList}
                  selectedList={selectedList}
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
                cell={<TextCell col="first_name"
                  data={filteredDataList}
                      />}
                header={<Cell>{'First Name'}</Cell>}
                width={150}
              />
              <TextColumn data={filteredDataList}/>
              <Column
                cell={<TextCell
                  col="last_name"
                  data={filteredDataList}
                      />}
                header={<Cell>{'Last Name'}</Cell>}
                width={150}
              />
              <Column
                cell={<TextCell
                  col="email"
                  data={filteredDataList}
                      />}
                header={<Cell>{'Email'}</Cell>}
                width={300}
              />
              <Column
                cell={<TextCell
                  col="phone"
                  data={filteredDataList}
                      />}
                header={<Cell>{'Phone'}</Cell>}
                width={200}
              />
              <Column
                cell={<TextCell
                  col="id"
                  data={filteredDataList}
                      />}
                header={<Cell>{'ID'}</Cell>}
                width={200}
              />
            </Table>
          </div>
        </div>
      </div>
    );
  }
}

UsersTable.displayName = 'Users Table';

UsersTable.propTypes = {
  users: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
}

UsersTable.defaultProps = {
  users: [],
  width: 0
}

function mapDispatchToProps(dispatch) {
  return {
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(
  mapDispatchToProps
)(UsersTable)

export default UsersTable
