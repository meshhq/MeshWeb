
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'

const { Cell } = FixedDataTable;

const RadioCell = ({ data, rowIndex, selectedList, col, onChange, ...props }) => {

  let handleChange = function(e) {
    onChange(e, rowIndex)
  }
  let inputUI
  let object = data.getObjectAt(rowIndex)
  let idx = selectedList[object.id]
  if (idx) {
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
  onChange: PropTypes.func,
  rowIndex: PropTypes.number,
  selectedList: PropTypes.object.isRequired
}

RadioCell.displayName = 'Radio Cell'

export default RadioCell
