
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import TextCell from './cells/textCell'
import ActionBar from '../ActionBar'

const { Table, Column, Cell } = FixedDataTable;

class DataListWrapper {
  constructor(data, filteredMapping) {
    this._data = data
    if (filteredMapping === undefined) {
      const mapping = []
      for (let i = 0; i < data.length; i++) {
        mapping.push(i)
      }
      this._indexMapping = mapping
    } else {
      this._indexMapping = filteredMapping
    }
  }

  getSize() {
    return this._indexMapping.length
  }

  getObjectAt(index) {
    return this._data[this._indexMapping[index]]
  }
}

class UsersTable extends React.Component {
  constructor(props) {
    super(props);
    this._dataList = new DataListWrapper(this.props.users.users)
    this.state = {
      filteredDataList: this._dataList
    };

    this._handleOnFilterChange = this._handleOnFilterChange.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    this._dataList = new DataListWrapper(nextProps.users.users)
    this.setState({
      filteredDataList: this._dataList
    });
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
            <ActionBar />
            <Table
              headerHeight={50}
              height={1000}
              rowHeight={35}
              rowsCount={filteredDataList.getSize()}
              width={this.props.width}
              {...this.props}
            >
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
