
import React, { PropTypes } from 'react'
import _ from 'underscore'
import Validator from 'validator'

/**
 * Info widget takes a title, and an array of 'infoPairs'. An info pair
 * is an object w/ 'title' and 'value' keys.
 * @param  {String}         options.title     Title of Widget
 * @param  {Array[Object]}  options.infoPairs Array of infoPairs
 */
const InfoWidget = ({ title, infoPairs }) => {

  // Build rows. Ignore null/undefined values
  let rows = []
  _.each(infoPairs, (pair) => {
    const { title, value } = pair
    if (value) {

      // Data Detection
      let formattedValue

      // Look for array of values
      if (_.isArray(value)) {
        formattedValue = <dd className="value-components">{value}</dd>
      } else if (Validator.isEmail(value)) {
        formattedValue = <dd className="value-email"><a href={'mailto:' + value}>{value}</a></dd>
      } else if (Validator.isURL(value)) {
        formattedValue = <dd className="value-url"><a href={'http://www.' + value} target='_blank'>{value}</a></dd>
      } else {
        formattedValue = <dd className="value-plain">{value}</dd>
      }

      // Push the row
      rows.push(
        <div className={'col-xs-12 info-field'} key={title + value}>
          <dt className="detail-title">{title}</dt>
          {formattedValue}
        </div>
      )
    }
  })
  return (
    <div className="info-widget row">
      <div className="col-xs-12 separator">
      </div>
      <div className="col-xs-12 title">
        <p className="titleName">{title}</p>
      </div>
      <dl className="dl-horizontal">
        {rows}
      </dl>
    </div>
  )
}

// Default Props
InfoWidget.propTypes = {
  infoPairs: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

// Display Name
InfoWidget.displayName = 'Info Widget'

export default InfoWidget