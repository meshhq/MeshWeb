
import React, { PropTypes } from 'react'

const RadioHeader = ({ ...props }) => {
  let onSelectAll = props.onSelectAll.bind(this)

  let inputUI
  if (props.allAreSelected) {
    inputUI = (<input aria-label="..." checked onChange={onSelectAll} type="checkbox" />)
  } else {
    inputUI = (<input aria-label="..." onChange={onSelectAll} type="checkbox" />)
  }

  return (
    <div className="radio-table-header">
      <div className="input-group">
        {inputUI}
      </div>
    </div>
  );
}

RadioHeader.propTypes = {
  allAreSelected: PropTypes.bool.isRequired,
  onSelectAll: PropTypes.func.isRequired
}

RadioHeader.displayName = 'Radio Header'

export default RadioHeader
