
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import DataListWrapper from '../Shared/DataListWrapper'

const { Table, Column, Cell } = FixedDataTable;

class UsersTable extends React.Component {
  constructor(props) {
    super(props);

    this.handleOnFilterChange = this.handleOnFilterChange.bind(this);
    this.handleToggleAll = this._handleToggleAll.bind(this);

    this._dataList = new DataListWrapper(this.props.users.users)
    this.state = {
      filteredDataList: this._dataList,
      selectedList: {}
    };

  }

  componentWillReceiveProps(nextProps) {
    this._dataList = new DataListWrapper(nextProps.users.users)
    this.setState({
      filteredDataList: this._dataList
    });
  }

  /**
   * handleOnFilterChange is the callback for all changes to the text filter
   * @param  {[type]} e The Event
   */
  handleOnFilterChange(e) {
    // Not text in search bar.
    if (!e.target.value) {
      this.setState({
        filteredDataList: this._dataList
      });
    }

    let filterBy = e.target.value.toLowerCase();
    let size = this._dataList.getSize();
    let filteredIndexes = [];
    for (let index = 0; index < size; index++) {
      let { firstName } = this._dataList.getObjectAt(index);
      if (firstName.toLowerCase().indexOf(filterBy) !== -1) {
        filteredIndexes.push(index);
      }
    }

    this.setState({
      filteredDataList: new DataListWrapper(this.props.users, filteredIndexes)
    });
  }

  /**
   * handleToggleAll takes care of handling the event where all users are toggles
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
    const { filteredDataList, selectedList } = this.state
    return (
      <div className="users-container">
        <div className="data-table">
          <div className="header row">
            <div className="col-md-12">
              <h1>{'Users'}</h1>
              <h4>{'Master users table listing'}</h4>
            </div>
          </div>
          <div className="row action-wrapper">
            <div className="col-md-6 col-xs-12 dataTableWrapper">
              <input
                className="inputFilter"
                onChange={this.handleOnFilterChange}
                placeholder="Filter by First Name"
              />
              <br />
            </div>
          </div>
          <div className="row table-row">
            <div className="col-md-12 dataTableWrapper">
              <Table
                headerHeight={50}
                height={1000}
                rowHeight={35}
                rowsCount={filteredDataList.getSize()}
                width={this.props.width}
                {...this.props}
              >
                <Column
                  cell={<RadioCell
                    col="radio"
                    data={filteredDataList}
                    selectedList={selectedList}
                        />}
                  header={
                    <div className="input-group">
                      <span className="input-group-addon">
                        <input
                          aria-label="..."
                          onChange={this.handleToggleAll}
                          type="checkbox"
                        />
                      </span>
                    </div>}
                  width={40}
                />
                <Column
                  cell={<TextCell
                    col="first_name"
                    data={filteredDataList}
                        />}
                  header={<Cell>{'First Name'}</Cell>}
                  width={150}
                />
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
      </div>
    );
  }
}

UsersTable.propTypes = {
  users: PropTypes.object.isRequired,
  width: PropTypes.number.isRequired
}

UsersTable.defaultProps = {
  users: [],
  width: 0
}

UsersTable.displayName = 'Users Table'

export default UsersTable
