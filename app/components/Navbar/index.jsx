
import React, { PropTypes, Component } from 'react'

class NavBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.state = {activeNavIdx: this.props.activeSection}
  }

  _navItemWasClicked() {

  }

  render() {

    // Build up the nav items
    let navItems = []
    this.props.navTitles.forEach((title, idx) => {
      let item
      if (idx == this.state.activeNavIdx) {
        item = (
          <li className="active" key={title}>
            <a href="#" onClick={this._navItemWasClicked}>{title}
              <span className="sr-only">(current)</span>
            </a>
          </li>
        )
      } else {
        item = (
          <li key={title}>
            <a href="#" onClick={this._navItemWasClicked}>{title}</a>
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

// navTitles [Array<String>] is the section titles
// activeSection [Number] is the current selection
NavBar.propTypes = {
  navTitles: PropTypes.array.isRequired,
  activeNavIdx: PropTypes.number.isRequired
}


export default NavBar
