
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import TextCell from '../Shared/DataTableCells/TextCell'
import RadioCell from '../Shared/DataTableCells/RadioCell'
import DataListWrapper from '../Shared/DataListWrapper'
import ActionBar from '../ActionBar'

const { Table, Column, Cell } = FixedDataTable;

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this._dataList = new DataListWrapper(this.props.users.users)
    this.state = {
      filteredDataList: this._dataList
    };

    this._handleOnFilterChange = this._handleOnFilterChange.bind(this);
    this.handleActionClick = this._handleActionClick.bind(this)
  }

  componentWillReceiveProps(nextProps) {
    this._dataList = new DataListWrapper(nextProps.users.users)
    this.setState({
      filteredDataList: this._dataList
    });
  }

  _handleActionClick(idx) {
    switch(idx) {
    case 0:
        // Select All
        break;
    case 1:
        // New
        break;
    case 2:
        // Publish
        break;
    case 3:
        // Merge
        break;
    case 4:
        // Mote
        break;
      }
  }

  _handleOnFilterChange(e) {
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

  render() {
    const { filteredDataList } = this.state
    return (

      <div className="users-table">
        <div className="row table-wrapper">
          <div className="col-md-12 userTableWrapper">
            <ActionBar onActionClick={this.handleActionClick}/>
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
                  selectedList={[]}
                      />}
                header={
                  <div className="input-group">
                    <span className="input-group-addon">
                      <input
                        aria-label="..."
                        onChange={this._handleToggleAll}
                        type="checkbox"
                      />
                    </span>
                  </div>}
                width={40}
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
              <Column
                cell={<TextCell
                  col="id"
                  data={filteredDataList}
                      />}
                header={<Cell>{'ID'}</Cell>}
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
              <Column
                cell={<TextCell
                  col="id"
                  data={filteredDataList}
                      />}
                header={<Cell>{'ID'}</Cell>}
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

export default ActionBar
export default UsersTable
