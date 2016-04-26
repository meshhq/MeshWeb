
import React, { PropTypes, Component } from 'react'

// Nav Item Titles
const titles = ['DOCUMENTATION', 'SUPPORT']

class NavBar extends Component {
  constructor(props, context) {
    super(props, context)
  }

  _handleNavItemWasClicked(idx) {
    this.props.onNavChange(idx)
  }

  render() {

    const navItems = []
    for(let count = 0; count < 2; count++) {
      let title = titles[count]
      // let glyph = glyphs[count]
      let onClick = this._handleNavItemWasClicked.bind(this, count)
      let item = (
        <li key={title}>
          <a className="light"
            href="#"

            onClick={onClick}
          >
          {title}
          </a>
        </li>
      )
      navItems.push(item)
    }

    return (
      <nav className="navbarDefault">
        <div className="container">
          <div className="navbar-header">
            <button aria-expanded="false"
              className="navbar-toggle collapsed"
              data-target="#bs-example-navbar-collapse-1"
              data-toggle="collapse"
              type="button"
            >
            </button>
            <a className="navbar-header-brand"
              href="#"
            >
              {'MESH'}
            </a>
          </div>
          <ul className="nav navbar-nav navbar-right">
            {navItems}
            <li>
              <a className="bold"
                href="#"
              >
                {this.props.accountName}
              </a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

// navTitles [Array<String>] is the section titles
// activeSection [Number] is the current selection
NavBar.propTypes = {
  accountName: PropTypes.string.isRequired,
  activeNavIdx: PropTypes.number.isRequired,
  navTitles: PropTypes.array.isRequired,
  onNavChange: PropTypes.func.isRequired
}

// Display Name
NavBar.displayName = 'NavBar'

export default NavBar
