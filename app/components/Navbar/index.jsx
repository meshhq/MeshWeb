
import React, { PropTypes, Component } from 'react'

// Assets
import logo from '../../assets/images/mesh_logo.png'
import avatar from '../../assets/images/default-avatar-1.png'

// Nav Item Titles
const titles = ['Documentation', 'Support']

class NavBar extends Component {
  constructor(props, context) {
    super(props, context)
  }

  _handleNavItemWasClicked(idx) {
    this.props.onNavChange(idx)
  }

  render() {

    const navItems = []
    for(let count = 0; count < titles.length; count++) {
      let title = titles[count]
      // let glyph = glyphs[count]
      let onClick = this._handleNavItemWasClicked.bind(this, count)
      let item = (
        <li className="top-nav-link" key={title}>
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
      <nav className="navbar-default">
        <div className="container">
          <div className="navbar-header">
            <button aria-expanded="false"
              className="navbar-toggle collapsed"
              data-target="#bs-example-navbar-collapse-1"
              data-toggle="collapse"
              type="button"
            >
            </button>
            <div className="logo-box">
              <img className="img-responsive logo" src={logo} />
            </div>
          </div>

          <ul className="nav navbar-nav navbar-right">
            {navItems}
            <li className="profile-line">
              <a className="bold"
                href="#"
              >
                {this.props.accountName}
              </a>
              <img className="img-responsive img-circle avatar" src={avatar} />
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
