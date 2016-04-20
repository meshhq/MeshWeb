
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

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this.dataList = new DataListWrapper(this.props.users.users)
    this.state = {
      filteredDataList: this.dataList,
      selectedList: {}
    };

    this.handleOnFilterChange = this._handleOnFilterChange.bind(this);
    this.handleActionClick = this._handleActionClick.bind(this)
    this.handleToggleAll = this._handleToggleAll.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this.dataList = new DataListWrapper(nextProps.users.users)
    this.setState({
      filteredDataList: this.dataList
    });
  }

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
   * _handleOnFilterChange is the callback for all changes to the text filter
   * @param  {[type]} e The Event
   */
  _handleOnFilterChange(e) {
    if (!e.target.value) {
      this.setState({
        filteredDataList: this.dataList
      });
    }

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
    const { filteredDataList, selectedList  } = this.state
    return (

      <div className="data-table">
        <div className="row table-wrapper">
          <div className="col-md-12 dataTableWrapper">
            <ActionBar
              onActionClick={this.handleActionClick}
              onSearchInput={this.handleOnFilterChange}
            />
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
