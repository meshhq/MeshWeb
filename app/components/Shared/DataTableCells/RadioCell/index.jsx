
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const RadioCell = ({ data, rowIndex, selectedList, col, onChange, ...props }) => {
  let handleChange = function(e) {
    onChange(e, rowIndex)
  }

  const object = data.getObjectAt(rowIndex)
  let inputUI
  // TODO: Add logic to check if array contains
  // selectedList.contains(object.id)
  if (false) {
    inputUI = (
      <input
        aria-label="..."
        checked
        onChange={handleChange}
        type="checkbox"
      />
    )
  } else {
    inputUI = (
      <input
        aria-label="..."
        onChange={handleChange}
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

RadioCell.propTypes = {
	col: PropTypes.string.isRequired,
  data: PropTypes.object.isRequired,
	props: PropTypes.object.isRequired,
  rowIndex: PropTypes.number.isRequired,
  selectedList: PropTypes.array.isRequired
}

RadioCell.displayName = 'Radio Cell'

export default RadioCell
