
import React, { PropTypes, Component } from 'react'

class NavBar extends Component {
  displayName: "Nav Bar";
  constructor(props, context) {
    super(props, context)
  }

  _handleNavItemWasClicked(idx) {
    this.props.onNavChange(idx)
  }

  render() {
    // Build up the nav items
    let navItems = []
    this.props.navTitles.forEach((title, idx) => {
      let item
      let boundClick = this._handleNavItemWasClicked.bind(this, idx)
      if (idx == this.props.activeNavIdx) {
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
      <div className="navbar">
        <nav className="navbarDefault">
          <div className="container">
            <div className="navbar-header">
              <button aria-expanded="false"
                className="navbar-toggle collapsed" 
                data-target="#bs-example-navbar-collapse-1" 
                data-toggle="collapse" 
                type="button"
              >
                <span className="sr-only">{'Toggle navigation'}</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" 
                href="#"
              >
              {'MeshIO'}
              </a>
            </div>

            <div className="collapse navbar-collapse" 
              id="bs-example-navbar-collapse-1"
            >
              <ul className="nav navbar-nav">
                {navItems}
              </ul>
            </div>
          </div>
        </nav>
      </div>
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


export default NavBar
