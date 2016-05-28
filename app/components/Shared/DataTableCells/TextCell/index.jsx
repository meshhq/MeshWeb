
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const TextCell = ({ rowIndex, data, col, ...props }) => {
  let object = data.getObjectAt(rowIndex)
  let onClick = props.onClick.bind(this, rowIndex)
  return (
    <div className="text-cell">
      <Cell {...props} onClick={onClick}>
        <p> {object[col]}</p>
      </Cell>
    </div>
    )
}

TextCell.propTypes = {
	col: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
  onClick: PropTypes.func.isRequired
}

TextCell.displayName = 'Text Cell'

export default TextCell
