
import React, { Component, PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import UserTableCell from '../UserTableCell'

const {Column, Cell} = FixedDataTable

class UserColumn extends Component {
  constructor(userData, col, title) {
    super(userData, col, title)
  }

  render() {
    return (
      <div>Checke Chek</div>
    )
  }
}

UserColumn.propTypes = {
  userData: PropTypes.array,
  col: PropTypes.string,
  title: PropTypes.string
}

export default UserColumn
