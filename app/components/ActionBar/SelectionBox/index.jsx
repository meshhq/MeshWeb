
import React, { Component } from 'react'

class SelectionBox extends Component {
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

SelectionBox.displayName = 'Selection Box';

export default SelectionBox
