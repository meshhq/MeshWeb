import React, { Component, PropTypes } from 'react'

class ActionButton extends Component {
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

ActionButton.displayName = 'Action Button';

ActionButton.propTypes = {
  onButtonClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default ActionButton
