
import React, { Component, PropTypes } from 'react'
import { Link } from 'react-router'
import mixpanel from 'mixpanel-browser'

class NavItem extends Component {

  constructor(props, context) {
    super(props, context)
    this.trackClick = this._trackClick.bind(this)
  }

  _trackClick() {
    mixpanel.track(this.props.title + ' Nav Clicked');
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
          <Link onClick={this.trackClick} to={`/${lowercaseName}`} >{this.props.title}</Link>
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
