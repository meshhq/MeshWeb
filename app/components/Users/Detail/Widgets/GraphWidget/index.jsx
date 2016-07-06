
import React, { PropTypes } from 'react'
import { Line as LineChart } from 'react-chartjs';
import _ from 'underscore'

/**
 * Graph Widget...
 * @param  {String}         options.title     Title of Widget
 * @param  {Array[Object]}  options.infoPairs Array of infoPairs
 */
const GraphWidget = ({ height, title, subTitle, graphData, graphOptions, width }) => {
  const adjustedWidth = width - 20
  const adjustedHeight = height - 40
  console.log(adjustedHeight, adjustedWidth)
  const chart = <LineChart data={graphData} height={adjustedHeight} options={graphOptions} width={adjustedWidth}/>
  return (
    <div className="chart-widget row">
      <div className="col-xs-12 title">
        <h5>{title}</h5>
      </div>
      <div className="col-xs-12 subtitle">
        <p>{subTitle}</p>
      </div>
      <div className="col-xs-12 chart">
        {chart}
      </div>
    </div>
  )
}

// Default Props
GraphWidget.propTypes = {
  graphData: PropTypes.object.isRequired,
  graphOptions: PropTypes.object.isRequired,
  height: PropTypes.number.isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  width: PropTypes.number.isRequired
}

// Display Name
GraphWidget.displayName = 'Graph Widget'

export default GraphWidget