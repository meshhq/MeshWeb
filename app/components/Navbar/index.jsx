
import React, { PropTypes, Component } from 'react'

class NavBar extends Component {
  constructor(props, context) {
    super(props, context)
  }

  _handleNavItemWasClicked(idx) {
    this.props.onNavChange(idx)
  }

  render() {
    // Build up the nav items
    const navItems = []
    this.props.navTitles.forEach((title, idx) => {
      let item
      const boundClick = this._handleNavItemWasClicked.bind(this, idx)
      if (idx === this.props.activeNavIdx) {
        item = (
          <li className="active" 
            key={title}
          >
            <a href="#"
              onClick={boundClick}
            >
              {title}
              <span className="sr-only">{'(current)'}</span>
            </a>
          </li>
        )
      } else {
        item = (
          <li key={title}>
            <a href="#"
              onClick={boundClick}
            >{title}</a>
          </li>
        )
      }
      navItems.push(item)
    });


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
              <a className="navbar-header-brand" href="#">
                {'MESH'}
              </a>
            </div>
            <ul className="nav navbar-nav navbar-right">
              <li><a className="light" href="#">DOCUMENTATION</a></li>
              <li><a className="light"href="#">SUPPORT</a></li>
              <li><a className="bold" href="#">KEVIN COLEMAN</a></li>
            </ul>
          </div>
        </nav>
    )
  }
}

// navTitles [Array<String>] is the section titles
// activeSection [Number] is the current selection
NavBar.propTypes = {
  activeNavIdx: PropTypes.number.isRequired,
  navTitles: PropTypes.array.isRequired,
  onNavChange: PropTypes.func.isRequired
}

// Display Name
NavBar.displayName = 'NavBar'

export default NavBar
