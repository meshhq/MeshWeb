
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import Pill from '../../Pill'

const { Cell } = FixedDataTable;

const PillCell = ({ rowIndex, data, providers, col, ...props }) => {
  let providerType = data.getObjectAt(rowIndex)[col]
  let provider = providers.find(function(provider) {
    return provider.type == providerType
  });

  return (
    <div className="pill-cell">
      <Cell {...props}>
        <Pill color={provider.color} title={provider.name} />
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
