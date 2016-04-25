
import React, { Component, PropTypes } from 'react'

class RadioButton extends Component {
  render() {
    return (
      <div className="selection-box">
        <button className="btn btn-default"
          type="button"
        >
          <input type="checkbox" />
        </button>
      </div>
    )
  }
}

RadioButton.displayName = 'Selection Box';

RadioButton.propTypes = {
  onClick: PropTypes.func.isRequired
}

export default RadioButton
