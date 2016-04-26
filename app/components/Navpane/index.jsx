import React, { PropTypes, Component } from 'react'
import NavItem from './NavItem'

// Nav Item Titles
const titles = ['Users', 'Organizations', 'Lists', 'Integrations']

// Nav Item Glyphs
const glyphs = ['glyphicon glyphicon-user', 'glyphicon glyphicon-th-large', 'glyphicon glyphicon-th-list', 'glyphicon glyphicon-ok']

class NavPane extends Component {
  constructor(props, context) {
    super(props, context)
  }

  _handleNavItemWasClicked(idx) {
    this.props.onNavChange(idx)
  }

  render() {

    const navItems = []
    for(let count = 0; count < 4; count++) {
      let title = titles[count]
      let glyph = glyphs[count]
      let onClick = this._handleNavItemWasClicked.bind(this, count)

      let item
      if (count == this.props.activeNavIdx) {
        item = (
          <NavItem glyph={glyph}
            onClick={onClick}
            title={title}
          />
        )
      } else {
        item = (
          <NavItem glyph={glyph}
            onClick={onClick}
            title={title}
          />
        )
      }
      navItems.push(item)
    }

    return (
      <div className="navpane">
        {navItems}
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
