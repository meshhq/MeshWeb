
import React, { PropTypes } from 'react'
import Chart from 'chart.js'

/**
 * Graph Widget...
 * @param  {String}         options.title     Title of Widget
 * @param  {Array[Object]}  options.infoPairs Array of infoPairs
 */
class GraphWidget extends React.Component {
  constructor(props, context) {
    super(props, context)

    // Bind chart config
    this.configureChart = this._configureChart.bind(this)
  }

  componentDidMount() {
    this.configureChart()
  }

  _configureChart() {
    // Get options and data
    const { graphData, graphOptions } = this.props

    // Get canvas ctx
    const ctx = this.chart.getContext('2d');

    // Generate the gradient
    const gradient = ctx.createLinearGradient(0, 0, 0, 170);
    gradient.addColorStop(0, '#43cea2');
    gradient.addColorStop(1, '#185a9d');

    // Inject the Gradient
    graphData.datasets[0].backgroundColor = gradient

    // Set the Chart info
    const myLineChart = new Chart(ctx, { // eslint-disable-line no-unused-vars
      type: 'line',
      data: graphData,
      options: graphOptions
    })
  }

  render() {
    const { title, subTitle } = this.props
    const adjustedWidth = this.props.containerWidth - 20
    const styleOverride = { height: '100%', width: adjustedWidth }
    const chartRef = (ref) => {
      this.chart = ref
    }

    return (
      <div className="chart-widget row" id="chart-id-group">
        <div className="col-xs-12 title">
          <h5>{title}</h5>
        </div>
        <div className="col-xs-12 subtitle">
          <p>{subTitle}</p>
        </div>
        <div className="col-xs-12 separator">
        </div>
        <div className="col-xs-12 chart">
          <canvas className="chart" height="150" ref={chartRef} style={styleOverride} width="300" />
        </div>
      </div>

    )
  }

}

// Default Props
GraphWidget.propTypes = {
  containerWidth: PropTypes.number.isRequired,
  graphData: PropTypes.object.isRequired,
  graphOptions: PropTypes.object.isRequired,
  subTitle: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

// Display Name
GraphWidget.displayName = 'Graph Widget'

export default GraphWidget
