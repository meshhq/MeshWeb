
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import Pill from '../../Pill'

const { Cell } = FixedDataTable;

const PillCell = ({ rowIndex, data, col, ...props }) => {
  let provider = data.getObjectAt(rowIndex)[col]
  if (provider == undefined) {
    provider = 0;
  }

  // TODO add color to provider.json and figure out how to get it here.
  let color = '#E77E3B'
  let title = 'Some Provider'

  return (
    <div className="pill-cell">
      <Cell {...props}>
        <Pill color={color} title={title} />
      </Cell>
    </div>
    )
}

PillCell.propTypes = {
	col: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired
}

PillCell.displayName = 'Pill Cell'

export default PillCell
