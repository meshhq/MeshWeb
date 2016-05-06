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
    for(let idx = 0; idx < 4; idx++) {
      let title = titles[idx]
      let glyph = glyphs[idx]
      let onClick = this._handleNavItemWasClicked.bind(this, idx)

      let item
      if (idx == this.props.activeNavIdx) {
        item = ( <NavItem active glyph={glyph} key={title} onClick={onClick} title={title} /> )
      } else {
        item = ( <NavItem active={false} glyph={glyph} key={title} onClick={onClick} title={title} /> )
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
