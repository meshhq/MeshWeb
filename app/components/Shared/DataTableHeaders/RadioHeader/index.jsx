
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
const { Cell } = FixedDataTable;

const RadioHeader = ({ ...props }) => {
  let onSelectAll = props.onSelectAll.bind(this)
  return (
    <Cell>
      <div className="input-group">
        <input aria-label="..." className='radio-header-input' onChange={onSelectAll} type="checkbox"/>
      </div>
    </Cell>
  );
}

RadioHeader.propTypes = {
  onSelectAll: PropTypes.func.isRequired
}

RadioHeader.displayName = 'Radio Header'

export default RadioHeader
