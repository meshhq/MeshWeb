
import React from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const TextCell = ({ rowIndex, data, col, ...props }) => {
  return (
    <div className="text-cell">
      <Cell {...props}>
        <p>
          {data.getObjectAt(rowIndex)[col]}
        </p>
      </Cell> 
    </div>
    )
}

TextCell.displayName = 'Text Cell'

export default TextCell
