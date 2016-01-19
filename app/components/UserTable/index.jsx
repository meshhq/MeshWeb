
import React, { Component, PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import UserTableColumn from '../UserTableColumn'

const {Table, Column, Cell} = FixedDataTable

class UserTable extends Component {
  constructor(userData) {
    super(userData)
  }

  render() {
    const { userData } = this.props

    // Define Columns
    let columnTitles = []
    for (let key in userData[0]) {
      columnTitles.push(key)
    }

    let columns = columnTitles.map(col => {
      return <UserTableColumn userData={userData} col={col} title={col} key={col}/>
    });

    return (
      <Table
        rowHeight={50}
        headerHeight={50}
        rowsCount={2}
        width={1000}
        height={100}>
        <UserTableColumn userData={userData} col={columnTitles[0]} title={columnTitles[0]} key={columnTitles[0]}/>
        <Column
          header={<Cell>Col 1</Cell>}
          cell={<Cell>Column 1 static content</Cell>}
          width={100}
        />
      </Table>
    )
  }
}

UserTable.propTypes = {
  userData: PropTypes.array.isRequired
}


UserTable.defaultProps = {
  userData: []
}


export default UserTable
