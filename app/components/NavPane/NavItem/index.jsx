
import React, { Component, PropTypes } from 'react'

class NavItem extends Component {
  render() {
    return (
      <div className="nav-item">
        <div className="nav-item-container">
          <span aria-hidden="true"
            className={this.props.glyph}
          />
          <a href="" 
            onClick={this.props.onClick}
          >
            {this.props.title}
          </a>
        </div>
      </div>
    )
  }
}

NavItem.displayName = 'Navigation Item';

NavItem.propTypes = {
  glyph: PropTypes.string.isRequired,
  onClick: PropTypes.func.isRequired,
  title: PropTypes.string.isRequired
}

export default NavItem
