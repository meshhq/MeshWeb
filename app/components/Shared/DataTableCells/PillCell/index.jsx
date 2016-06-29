
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import Pill from '../../Pill'
import _ from 'underscore'

const { Cell } = FixedDataTable;

const PillCell = ({ rowIndex, data, providersByKey, ...props }) => {
  const integraitons = data.getObjectAt(rowIndex).integration_data
  
  let pills = []
  _.each(integraitons, (integraitonInfo, key) => {
    const provider = providersByKey[key]
    pills.push(
      <Pill color={provider.color}
        key={key}
        linkURL={integraitonInfo.url} 
        title={provider.name} 
      />
    )
  })

  return (
    <div className="pill-cell">
      <Cell {...props}>
        {pills}
      </Cell>
    </div>
    )
}

PillCell.propTypes = {
	col: PropTypes.string.isRequired,
	data: PropTypes.object.isRequired,
  providersByKey: PropTypes.object.isRequired,
  rowIndex: PropTypes.number
}

PillCell.displayName = 'Pill Cell'

export default PillCell
