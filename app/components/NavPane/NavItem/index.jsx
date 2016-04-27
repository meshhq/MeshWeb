
import React, { Component, PropTypes } from 'react'

class NavItem extends Component {

  render() {
    const klassName = this.props.active ? 'nav-item active' : 'nav-item'
    return (
      <div className={klassName}>
        <div className="nav-item-container">
          <span
            aria-hidden="true"
            className={this.props.glyph}
          />
          <a onClick={this.props.onClick}>
            {this.props.title}
          </a>
        </div>
      </div>
    )
  }
}

NavItem.displayName = 'Navigation Item';

NavItem.propTypes = {
  active: PropTypes.bool.isRequired,
  glyph: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default NavItem
