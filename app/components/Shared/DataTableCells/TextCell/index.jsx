
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const TextCell = ({ rowIndex, data, col, ...props }) => {
  console.log(data.getObjectAt(rowIndex))
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

TextCell.propTypes = {
	col: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired
}

TextCell.displayName = 'Text Cell'

export default TextCell
