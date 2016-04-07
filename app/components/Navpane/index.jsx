
import React, { Component } from 'react'

class NavItem extends Component {
  render() {
    return (
      <div className="item">
        <h4>{this.props.title}</h4>
      </div>
    )
  }
}

class NavPane extends Component {
  render() {
    return (
      <div className="navpane">
        <NavItem title="USERS"/>
        <NavItem title="ORGANIZATIONS"/>
        <NavItem title="LISTS"/>
        <NavItem title="INTEGRATIONS"/>
      </div>
    )
  }
}

export default NavPane
