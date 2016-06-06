import React, { PropTypes, Component } from 'react'
import NavItem from './NavItem'

// Nav Item Titles
import NavTitlesAndGlyphs from '../../constants/navSections'

class NavPane extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {


    // Ge the current path and look as the base path component
    let pathName = ''
    const pathComponents = this.props.currentPath.split('/')
    if (pathComponents.length > 1) {
      pathName = pathComponents[1].toLowerCase()
    }

    const navItems = []
    for(let i = 0; i < NavTitlesAndGlyphs.length; i++) {
      const titleGlyphPair = NavTitlesAndGlyphs[i]
      const title = titleGlyphPair.title
      const glyph = titleGlyphPair.glyph

      let active = false
      if (title.toLowerCase() === pathName) {
        active = true
      }

      navItems.push(<NavItem active={active} glyph={glyph} title={title}/>)
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
  currentPath: PropTypes.string.isRequired
}

export default NavPane
