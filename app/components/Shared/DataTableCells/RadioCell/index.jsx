
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const TextCell = ({ data, selectedList, col, ...props }) => {
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

  const { rowIndex } = this.props
  console.log(this.props)
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
  data: PropTypes.object.isRequired,
  selectedList: PropTypes.object.isRequired
}

TextCell.displayName = 'Radio Cell'

export default TextCell
