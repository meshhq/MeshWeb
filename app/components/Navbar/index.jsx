
import React, { PropTypes, Component } from 'react'
import { logUserOut } from '../../helpers/session'

// Assets
import logo from '../../assets/images/mesh_logo.png'
import avatar from '../../assets/images/default-avatar-1.png'

// Nav Item Titles
const titles = ['Documentation', 'Account', 'Support']

class NavBar extends Component {
  constructor(props, context) {
    super(props, context)
    this.logUserOut = this._logUserOut.bind(this)
  }

  _logUserOut(e) {
    e.preventDefault()
    logUserOut()
  }

  render() {

    const { onDisplayAccountModal } = this.props

    const navItems = []
    for(let count = 0; count < titles.length; count++) {
      let title = titles[count]

      // Dynamic
      let item
      if (title == 'Documentation') {
        item = (
          <li className="top-nav-link" key={title}>
            <a className="light"
              href='http://docs.meshdata.io'
              target='_blank'
            >
            {title}
            </a>
          </li>
        )
      } else if (title == 'Account') {
        item = (
          <li className="top-nav-link" key={title}>
            <a className="light"
              href='#'
              onClick={onDisplayAccountModal}
            >
            {'API'}
            </a>
          </li>
        )
      } else {
        let link = '#'
        if (title == 'Support') {
          link = 'mailto:support@meshdata.io'
        }
        item = (
          <li className="top-nav-link" key={title}>
            <a className="light"
              href={link}
            >
            {title}
            </a>
          </li>
        )
      }

      navItems.push(item)
    }

    let displayName = ''
    if (this.props.user) {
      displayName = this.props.user.first_name || this.props.user.email
    }

    /**
     * Account Modal Activation
     */
    let onAccountDisplay = () => onDisplayAccountModal()

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
            <li className="profile-line dropdown">
              <a className="bold dropdown-toggle" data-toggle="dropdown" href="#" id="right-nav-menu-a" role="button" >
                {displayName}
              </a>
              <img className="img-responsive img-circle avatar" src={avatar} />
              <ul className="dropdown-menu" id="right-nav-menu">
                <li className="dropdown-line-item" ><a href="#" onClick={onAccountDisplay} >{'Account'}</a></li>
                <li className="dropdown-line-item" ><a href="#" onClick={this.logUserOut} >{'Log Out'}</a></li>
              </ul>
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
  onDisplayAccountModal: PropTypes.func.isRequired,
  user: PropTypes.object
}

// Display Name
NavBar.displayName = 'NavBar'

export default NavBar
