import React, {Component, PropTypes} from 'react'
import FixedDataTable from 'fixed-data-table'

const {Table, Column, Cell} = FixedDataTable

class UserTableCell extends Component {
	constructor(rowIndex, data, col, ...props) {
	  super(rowIndex, data, col, ...props)
	  this.state = {}
	}

	render() {
		return (
			<Cell {...props}>
				{data.getObjectAt(rowIndex)[col]}
			</Cell>
		)
	}

}

UserTableCell.propTypes = {
	rowIndex: PropTypes.number,
	data: PropTypes.object,
	col: PropTypes.number
}