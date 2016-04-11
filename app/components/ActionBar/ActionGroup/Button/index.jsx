import React, { Component, PropTypes } from 'react'


class Button extends Component {
  render() {
    return (
      <button
        className="btn btn-default"
        onClick={this.props.onButtonClick}
        type="button"
      >
        {this.props.title}
      </button>
    )
  }
}

Button.displayName = 'Button';

Button.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default Button
