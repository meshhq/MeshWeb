
import React, { PropTypes } from 'react'
import FixedDataTable from 'fixed-data-table'
import Pill from '../../Pill'

const { Cell } = FixedDataTable;

const PROVIDERS = {
  0: 'MESH',
  1: 'SALESFORCE',
  2: 'NETSUITE',
  3: 'DYNAMICS',
  4: 'SUGAR',
  5: 'ZOHO',
  6: 'MARKETO',
  7: 'ELOQUA',
  8: 'PARDOT',
  9: 'HUBSPOT',
  10: 'ADOBE',
  11: 'ZENDESK',
  12: 'USERVOICE',
  13: 'FRESHDESK',
  14: 'SENDGRID',
  15: 'MAILCHIMP',
  16: 'INTERCOM',
  17: 'SHOPIFY',
  18: 'STRIPE',
  19: 'BRAINTREE',
  20: 'ZUORA',
  21: 'MIXPANEL',
  22: 'FLURRY',
  23: 'LOCALYTICS',
  24: 'HEAP'
}

const PROVIDER_COLORS = {
  0: '#579FE4',
  1: '#3E9ED8',
  2: '#E77E3B',
  3: '#849E43',
  4: '#579FE4',
  5: '#D7684F',
  6: '#3993EA',
  7: '#3993EA',
  8: '#3993EA',
  9: '#3993EA',
  10: '#3993EA',
  11: '#3993EA',
  12: '#3993EA',
  13: '#3993EA',
  14: '#3993EA',
  15: '#3993EA',
  16: '#3993EA',
  17: '#3993EA',
  18: '#3993EA',
  19: '#3993EA',
  20: '#3993EA',
  21: '#3993EA',
  22: '#3993EA',
  23: '#3993EA',
  24: '#3993EA'
}

const PillCell = ({ rowIndex, data, col, ...props }) => {
  let provider = data.getObjectAt(rowIndex)[col]
  if (provider == undefined) {
    provider = 0;
  }
  let color = PROVIDER_COLORS[provider]
  let title = PROVIDERS[provider]

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
	data: PropTypes.object.isRequired
}

PillCell.displayName = 'Pill Cell'

export default PillCell
