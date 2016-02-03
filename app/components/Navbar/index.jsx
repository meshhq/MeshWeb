
import React, { PropTypes, Component } from 'react'

//
class NavBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {navPosition: this.props.activeSection}
  }

  _navItemWasClicked() {

  }

  render() {

    // Build up the nav items
    let navItems = []
    this.props.sectionTitles.forEach(title, idx => {
      let item
      if (idx == this.state.navPosition) {
        item = (
          <li className="active">
            <a href="#" onClick={_navItemWasClicked}>{title}
              <span className="sr-only">(current)</span>
            </a>
          </li>
        )
      } else {
        item = (
          <li>
            <a href="#" onClick={_navItemWasClicked}>{title}</a>
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
              <button type="button" className="navbar-toggle collapsed" data-toggle="collapse" data-target="#bs-example-navbar-collapse-1" aria-expanded="false">
                <span className="sr-only">Toggle navigation</span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
                <span className="icon-bar"></span>
              </button>
              <a className="navbar-brand" href="#">MeshIO</a>
            </div>

            <div className="collapse navbar-collapse" id="bs-example-navbar-collapse-1">
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

// sectionTitles [Array<String>] is the section titles
// activeSection [Number] is the current selection
NavBar.propTypes = {
  sectionTitles: PropTypes.array.isRequired,
  activeSection: PropTypes.number.isRequired
}


export default NavBar
