
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const TextCell = ({ data, rowIndex, selectedList, col, ...props }) => {
  const user = data.getObjectAt(rowIndex)
  let inputUI
  if (selectedList[user.id] == true) {
    inputUI = (
      <input
        aria-label="..."
        checked
        type="checkbox"
      />
    )
  } else {
    inputUI = (
      <input
        aria-label="..."
        type="checkbox"
      />
    )
  }

  return (
    <div className={'radio-cell ' + rowIndex + '_' + col}>
      <Cell {...props}>
        <div className="input-group">
          {inputUI}
        </div>
      </Cell>
    </div>
    )
}

TextCell.propTypes = {
	col: PropTypes.string.isRequired,
	props: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired,
  selectedList: PropTypes.array.isRequired
}

TextCell.displayName = 'Text Cell'

export default TextCell
