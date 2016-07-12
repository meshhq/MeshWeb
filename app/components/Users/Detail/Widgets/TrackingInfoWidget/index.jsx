
import React, { PropTypes } from 'react'
import _ from 'underscore'
import Validator from 'validator'

/**
 * Info widget takes a title, and an array of 'infoPairs'. An info pair
 * is an object w/ 'title' and 'value' keys.
 * @param  {String}         title     Title of Widget
 * @param  {String}         subtitle  Title of Widget
 * @param  {Array[Object]}  trackingData Array of objects with the following format:
 *                                       {
                                            title: 'Subscription Information',
                                            data: [
                                              { title: 'Product', value: 'Sweet Product' },
                                              { title: 'Plan', value: 'Hacker Plan' }
                                            ]
                                          }
 */
const TrackingInfoWidget = ({ title, subtitle, trackingData }) => {

  // Build rows. Ignore null/undefined values
  let rows = []
  _.each(trackingData, (trackingInstance, idx) => {
    const { title: sectionTitle, data } = trackingInstance
    let trackingDataRows = _.map(data, (trackingData) => {
        if (trackingData) {
          const { value, title } = trackingData

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
          return (
            <div className={'col-xs-12 info-field'} key={title + value}>
              <dt className="detail-title">{title}</dt>
              {formattedValue}
            </div>
          )
        }
      })

      rows.push(
        <div className="col-xs-12 tracking-block" key={sectionTitle + idx}>
          <dl className="dl-horizontal">
            <div className={'tracking-group'}>
              <p className="section-title">{sectionTitle}</p>
              {trackingDataRows}
            </div>
          </dl>
        </div>
      )
    })

  return (
    <div className="tracking-info-widget row">
      <div className="col-xs-12 title-block">
        <p className="title">{title}</p>
        <p className="sub-title">{subtitle}</p>
        <div className="col-xs-12 separator">
        </div>
      </div>
      {rows}
    </div>
  )
}

// Default Props
TrackingInfoWidget.propTypes = {
  subtitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  trackingData: PropTypes.array.isRequired
}

// Display Name
TrackingInfoWidget.displayName = 'Tracking Info Widget'

export default TrackingInfoWidget
