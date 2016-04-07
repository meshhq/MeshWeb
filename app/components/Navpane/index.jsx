
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
        <NavItem title="Users"/>
        <NavItem title="Organizations"/>
        <NavItem title="Lists"/>
        <NavItem title="Integrations"/>
      </div>
    )
  }
}

export default NavPane
