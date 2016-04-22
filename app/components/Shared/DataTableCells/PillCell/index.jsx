
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import Pill from '../../Pill'
import Helper from '../../../../helpers/providers.js'

const { Cell } = FixedDataTable;

const { PROVIDERS, PROVIDER_COLORS } = Helper;

const PillCell = ({ rowIndex, data, col, ...props }) => {

  let color = PROVIDER_COLORS[0]
  let title = PROVIDERS[0]

  let test = PROVIDER_COLORS[data.getObjectAt(rowIndex)[col]]
  console.log(test)

  // let title = PROVIDERS[data.getObjectAt(rowIndex)[col]]
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
