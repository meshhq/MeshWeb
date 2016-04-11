
import React from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const TextCell = ({ rowIndex, data, col, ...props }) => {
  return (
    <Cell {...props}>
      {data.getObjectAt(rowIndex)[col]}
    </Cell>
  )
}

TextCell.displayName = 'Text Cell'

export default TextCell
