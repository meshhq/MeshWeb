
import React, { Component } from 'react'

class DropdownButton extends Component {
  render() {
    return (
      <div className="btn-group">
        <button
          aria-expanded="false"
          aria-haspopup="true"
          className="btn btn-default dropdown-toggle"
          data-toggle="dropdown"
          type="button"
        >
          {this.props.title}
          <span className="caret"></span>
          <span className="sr-only">{"Toggle Dropdown"}</span>
        </button>
        <ul className="dropdown-menu">
          <li><a href="#">{this.props.title}</a></li>
          <li><a href="#">{"Another action"}</a></li>
          <li><a href="#">{"Something else here"}</a></li>
          <li
            className="divider"
            role="separator"
          />
          <li><a href="#">{"Separated link"}</a></li>
        </ul>
      </div>
    )
  }
}

export default DropdownButton
