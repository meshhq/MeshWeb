
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import Pill from '../../Pill'

const { Cell } = FixedDataTable;

const PROVIDERS = {
  0: 'MESH',
  1: 'SALESFORCE',
  2: 'HUBSPOT',
  3: 'ZENDESK',
  4: 'SENDGRID',
  5: 'MAILCHIMP',
  6: 'INTERCOM',
  7: 'SHOPIFY'
}

const PROVIDER_COLORS = {
  0: '#579FE4',
  1: '#3E9ED8',
  2: '#E77E3B',
  3: '#849E43',
  4: '#579FE4',
  5: '#D7684F',
  6: '#3993EA',
  7: '#SHOPIFY'
}

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

PillCell.displayName = 'Pill Cell'

export default PillCell
