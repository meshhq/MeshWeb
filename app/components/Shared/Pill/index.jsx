import React, { PropTypes, Component } from 'react'

class Pill extends Component {
  constructor(props, context) {
    super(props, context)
  }
  
  render() {
    const pillTextStyle = {
      color: this.props.color
    }

    const pillStyle = {
      borderColor: this.props.color
    }
    
    return (
      <div className="pill-container" style={pillStyle}>
        <a href={'http://' + this.props.linkURL} target='_blank'><p style={pillTextStyle}>{this.props.title}</p></a>
      </div>
    )
  }
}

Pill.propTypes = {
  color: PropTypes.string.isRequired,
  linkURL: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

// Display Name
Pill.displayName = 'Pill'

export default Pill
