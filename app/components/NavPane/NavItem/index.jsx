
import React, { Component } from 'react'

class NavItem extends Component {
  render() {
    return (
      <div className="nav-item">
        <div className="nav-item-container">
          <span aria-hidden="true"
            className={this.props.glyph}
          />
          <a onClick={this.props.onClick}>{this.props.title}</a>
        </div>
      </div>
    )
  }
}

export default NavItem
