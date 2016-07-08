
import React, { PropTypes } from 'react'
import { Line as LineChart } from 'react-chartjs';

/**
 * Graph Widget...
 * @param  {String}         options.title     Title of Widget
 * @param  {Array[Object]}  options.infoPairs Array of infoPairs
 */
const GraphWidget = ({ title, subTitle, graphData, graphOptions }) => {
  const styleOverride = { height: '100%', width: '100%' }
  const chart = <LineChart data={graphData} options={graphOptions} style={styleOverride} />
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
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

// Display Name
GraphWidget.displayName = 'Graph Widget'

export default GraphWidget