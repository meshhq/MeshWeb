import React, { PropTypes, Component } from 'react'

class Pill extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    let divStyle = { 'backgroundColor': this.props.color, 'border-radius': 4 }
    let pStyle = { 'font-weight': 'bold', 'color': 'white' }
    return (
      <div className="pill-container"
        style={divStyle}
      >
        <p style={pStyle}>{this.props.title}</p>
      </div>
    )
  }
}

Pill.propTypes = {
  color: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

// Display Name
Pill.displayName = 'Pill'

export default Pill
