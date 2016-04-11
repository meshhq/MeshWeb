import React, { Component } from 'react'


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

export default Button
