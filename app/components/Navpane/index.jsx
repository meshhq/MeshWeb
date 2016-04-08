
import React, { Component } from 'react'

class NavItem extends Component {
  render() {
    return (
      <div className="nav-item">
        <div className="nav-item-container">
          <span className={this.props.glyph} aria-hidden="true"></span>
          <h4>{this.props.title}</h4>
        </div>
      </div>
    )
  }
}

class NavItemSelected extends Component {
  render() {
    return (
      <div className="nav-item-selected">
        <div className="nav-item-container">
          <span className={this.props.glyph} aria-hidden="true"></span>
          <h4>{this.props.title}</h4>
        </div>
      </div>
    )
  }
}

class NavPane extends Component {
  render() {
    return (
      <div className="navpane">
        <NavItemSelected glyph="glyphicon glyphicon-user" title="USERS"/>
        <NavItem glyph="glyphicon glyphicon-th-large" title="ORGANIZATIONS"/>
        <NavItem glyph="glyphicon glyphicon-th-list" title="LISTS"/>
        <NavItem glyph="glyphicon glyphicon-ok" title="INTEGRATIONS"/>
      </div>
    )
  }
}

export default NavPane
