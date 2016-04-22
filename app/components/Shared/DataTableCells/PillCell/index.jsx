
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import Pill from '../../Pill'

const { Cell } = FixedDataTable;

const PROVIDERS = {}
const PROVIDER_COLORS = {}

const PillCell = ({ rowIndex, data, col, ...props }) => {

  let color = PROVIDER_COLORS[data.getObjectAt(rowIndex)[col]]
  let title = PROVIDERS[data.getObjectAt(rowIndex)[col]]

  return (
    <div className="pill-cell">
      <Cell {...props}>
        <Pill
          color={color}
          title={title}
        />
      </Cell>
    </div>
    )
}

PillCell.propTypes = {
	col: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
	props: PropTypes.array.isRequired,
  rowIndex: PropTypes.number.isRequired
}

PillCell.displayName = 'Text Cell'

export default PillCell
