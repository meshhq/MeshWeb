
import React, { PropTypes } from 'react'
import _ from 'underscore'
import Validator from 'validator'

/**
 * Graph Widget...
 * @param  {String}         options.title     Title of Widget
 * @param  {Array[Object]}  options.infoPairs Array of infoPairs
 */
const GraphWidget = ({ title, subTitle, infoPairs }) => {

  // Build rows. Ignore null/undefined values
  let rows = []
  _.each(infoPairs, (pair) => {
    const { title, value } = pair
    if (value) {

      // Data Detection
      let formattedValue

      // Look for array of values
      if (_.isArray(value)) {
        formattedValue = <dd className='value-components'>{value}</dd>
      } else if (Validator.isEmail(value)) {
        formattedValue = <dd className='value-email'><a href={'mailto:' + value}>{value}</a></dd>
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
GraphWidget.propTypes = {
  infoPairs: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

// Display Name
GraphWidget.displayName = 'Info Widget'

export default GraphWidget

/**
 * Testing Data
 */

const testGraphData = {
    labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July'],
    datasets: [
        {
            label: 'My First dataset',
            fill: false,
            lineTension: 0.1,
            backgroundColor: 'rgba(75,192,192,0.4)',
            borderColor: 'rgba(75,192,192,1)',
            borderCapStyle: 'butt',
            borderDash: [],
            borderDashOffset: 0.0,
            borderJoinStyle: 'miter',
            pointBorderColor: 'rgba(75,192,192,1)',
            pointBackgroundColor: '#fff',
            pointBorderWidth: 1,
            pointHoverRadius: 5,
            pointHoverBackgroundColor: 'rgba(75,192,192,1)',
            pointHoverBorderColor: 'rgba(220,220,220,1)',
            pointHoverBorderWidth: 2,
            pointRadius: 1,
            pointHitRadius: 10,
            data: [65, 59, 80, 81, 56, 55, 40]
        }
    ]
};