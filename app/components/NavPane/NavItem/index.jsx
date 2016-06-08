
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'

class NavItem extends Component {

  constructor(props, context) {
    super(props, context)
  }

  render() {
    const klassName = this.props.active ? 'nav-item active' : 'nav-item'
    const lowercaseName = this.props.title.toLowerCase()
    return (
      <div className={klassName}>
        <div className="nav-item-left-hlbox-container">
          <div className="nav-item-left-hlbox">
          </div>
        </div>
        <div className="nav-item-container">
          <span aria-hidden="true" className={this.props.glyph} />
          <Link to={`/${lowercaseName}`} >{this.props.title}</Link>
        </div>
      </div>
    )
  }
}

NavItem.displayName = 'Navigation Item';

NavItem.propTypes = {
  active: PropTypes.bool.isRequired,
  glyph: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired
}

export default NavItem
