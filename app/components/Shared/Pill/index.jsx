import React, { PropTypes, Component } from 'react'

class Pill extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {
    let divStyle = { 'backgroundColor': this.props.color }
    return (
      <div className="pill-container" style={divStyle}>
        <p>{this.props.title}</p>
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
