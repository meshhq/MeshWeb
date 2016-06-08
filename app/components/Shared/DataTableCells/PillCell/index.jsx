
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import Pill from '../../Pill'

const { Cell } = FixedDataTable;

const PillCell = ({ rowIndex, data, providers, col, ...props }) => {
  let providerType = data.getObjectAt(rowIndex)[col]
  if (providerType == 0) {
    providerType = 1000
  }

  let provider = providers.find(function(provider) {
    return provider.type == providerType
  });

  const pillDivStyle = {
    color: provider.color
  }

  const pillStyle = {
    borderColor: provider.color
  }

  return (
    <div className="pill-cell">
      <Cell {...props}>
        <div className="provider-pill" style={pillDivStyle} >
          <p style={pillStyle}>{provider.name}</p>
        </div>
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
