
import React, { Component, PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import TextCell from './cells/textCell'

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
            <ActionBar />,
            <Table
              headerHeight={50}
              height={1000}
              rowHeight={35}
              rowsCount={filteredDataList.getSize()}
              width={this.props.width}
              {...this.props}
            >
              <Column
                cell={<TextCell col="first_name" data={filteredDataList} />}
                header={<Cell>{'First Name'}</Cell>}
                width={150}
              />
              <Column
                cell={<TextCell col="last_name" data={filteredDataList} />}
                header={<Cell>{'Last Name'}</Cell>}
                width={150}
              />
              <Column
                cell={<TextCell col="email" data={filteredDataList} />}
                header={<Cell>{'Email'}</Cell>}
                width={300}
              />
              <Column
                cell={<TextCell col="phone" data={filteredDataList} />}
                header={<Cell>{'Phone'}</Cell>}
                width={200}
              />
              <Column
                cell={<TextCell col="id" data={filteredDataList} />}
                header={<Cell>{'ID'}</Cell>}
                width={200}
              />
              <Column
                cell={<TextCell col="id" data={filteredDataList} />}
                header={<Cell>{'ID'}</Cell>}
                width={200}
              />
              <Column
                cell={<TextCell col="id" data={filteredDataList} />}
                header={<Cell>{'ID'}</Cell>}
                width={200}
              />
              <Column
                cell={<TextCell col="id" data={filteredDataList} />}
                header={<Cell>{'ID'}</Cell>}
                width={200}
              />
              <Column
                cell={<TextCell col="id" data={filteredDataList} />}
                header={<Cell>{'ID'}</Cell>}
                width={200}
              />
              <Column
                cell={<TextCell col="id" data={filteredDataList} />}
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

class ActionBar extends Component {
  render() {
    return (
      <div className="action-bar">
        <SelectionBox />
        <Actions />
        <SearchBar />
      </div>
    )
  }
}

class SelectionBox extends Component {
  render() {
    return (
      <div className="selection-box">
        <button type="button" className="btn btn-default">
            <input type="checkbox" />
        </button>
      </div>
    )
  }
}

class Actions extends Component {
  render() {
    return (
      <div className="actions">
        <button type="button" className="btn btn-default">New</button>
        <button type="button" className="btn btn-default">Merge</button>
        <button type="button" className="btn btn-default">Publish</button>
        <DropdownButton title="More" />
      </div>
    )
  }
}


class ActionButton extends Component {
  render() {
    return (
      <button onClick={this.props.onButtonClick} className="action-button">
        <h4>{this.props.title}</h4>
      </button>
    )
  }
}

class SearchBar extends Component {
  render() {
    return (
      <div className="search-bar">
        <div className="input-group">
          <input type="text" className="form-control" placeholder="Filter" aria-describedby="basic-addon1" />
        </div>
      </div>
    )
  }
}

class DropdownButton extends Component {
  render() {
    return (
      <div className="btn-group">
        <button type="button" className="btn btn-default dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
          {this.props.title}
          <span className="caret"></span>
          <span className="sr-only">Toggle Dropdown</span>
        </button>
        <ul className="dropdown-menu">
          <li><a href="#">{this.props.title}</a></li>
          <li><a href="#">Another action</a></li>
          <li><a href="#">Something else here</a></li>
          <li role="separator" className="divider"></li>
          <li><a href="#">Separated link</a></li>
        </ul>
      </div>
    )
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

export default ActionBar
export default UsersTable
