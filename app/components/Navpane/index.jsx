import React, { PropTypes, Component } from 'react'
import NavItem from './NavItem'

class NavPane extends Component {
  constructor(props, context) {
    super(props, context)
  }

  _handleNavItemWasClicked(idx) {
    this.props.onNavChange(idx)
  }

  render() {
    const userClick = this._handleNavItemWasClicked.bind(this, 0)
    const users = (
      <NavItem glyph="glyphicon glyphicon-user"
        onClick={userClick}
        title="USERS"
      />
    )
    const organizationsClick = this._handleNavItemWasClicked.bind(this, 1)
    const organizations = (
      <NavItem glyph="glyphicon glyphicon-th-large"
        onClick={organizationsClick}
        title="ORGANIZATIONS"
      />
    )
    const listsClick = this._handleNavItemWasClicked.bind(this, 2)
    const lists = (
      <NavItem glyph="glyphicon glyphicon-th-list"
        onClick={listsClick}
        title="LISTS"
      />
    )
    const integrationsClick = this._handleNavItemWasClicked.bind(this, 3)
    const integrations = (
      <NavItem glyph="glyphicon glyphicon-ok"
        onClick={integrationsClick}
        title="INTEGRATIONS"
      />
    )
    return (
      <div className="navpane">
        {users}
        {organizations}
        {lists}
        {integrations}
      </div>
    )
  }
}

NavPane.displayName = 'Navigation Pane';
NavPane.propTypes = {
  activeNavIdx: PropTypes.number.isRequired,
  onNavChange: PropTypes.func.isRequired
}

export default NavPane
