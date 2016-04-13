
import React, { PropTypes } from 'react'
import FixedDataTable  from 'fixed-data-table'
import TextCell from '../../Shared/DataTableCells/TextCell'

const {  Column, Cell } = FixedDataTable;

class TableColumn extends React.Component {
  render() {
    return (
      <Column
        cell={<TextCell col={this.props.cellKey}
          data={this.props.data}
              />}
        header={<Cell>{this.props.title}</Cell>}
        width={this.props.cellWidth}
      />
    )
  }
}

TableColumn.propTypes = {
  cellKey: PropTypes.string.isRequired,
  cellWidth: PropTypes.number.isRequired,
  data: PropTypes.object.isRequired,
  title: PropTypes.string.isRequired
}

TableColumn.displayName = 'Test'

export default TableColumn
