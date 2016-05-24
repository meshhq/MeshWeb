
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const RadioCell = ({ data, rowIndex, selectedList, col, onChange, ...props }) => {

  let handleChange = function(e) {
    onChange(e, rowIndex)
  }
  let inputUI
  let object = data.getObjectAt(rowIndex)
  let idx = selectedList.indexOf(object)
  if (idx != -1) {
    inputUI = (<input aria-label="..." checked onChange={handleChange} type="checkbox" />)
  } else {
    inputUI = (<input aria-label="..." onChange={handleChange} type="checkbox" />)
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
  selectedList: PropTypes.array.isRequired
}

RadioCell.displayName = 'Radio Cell'

export default RadioCell
