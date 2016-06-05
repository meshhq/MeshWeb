
import React, { Component, PropTypes } from 'react'

class NavItem extends Component {

  constructor(props, context) {
    super(props, context)
    this.handleOnClick = this._handleOnClick.bind(this)
  }

  _handleOnClick(e) {
    e.preventDefault()
    this.props.onClick()
  }

  render() {
    const klassName = this.props.active ? 'nav-item active' : 'nav-item'
    return (
      <div className={klassName}>
        <div className="nav-item-left-hlbox-container">
          <div className="nav-item-left-hlbox">
          </div>
        </div>
        <div className="nav-item-container">
          <span aria-hidden="true" className={this.props.glyph} />
          <a href="" onClick={this.handleOnClick}> {this.props.title} </a>
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
