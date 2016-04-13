
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const TextCell = ({ rowIndex, data, col, ...props }) => {
  let user = data.getObjectAt(rowIndex)
  if (!user) {
    return <div/>
  }

  return (
    <div className="text-cell">
      <Cell {...props}>
        <p>
          {user[col]}
        </p>
      </Cell>
    </div>
    )
}

TextCell.propTypes = {
	col: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	props: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
}

TextCell.displayName = 'Text Cell'

export default TextCell
