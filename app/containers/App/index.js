
import { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import Navbar from '../../components/Navbar'
import UserTable from '../../components/UserTable'

// Actions
import * as NavActions from '../../actions/nav'
import * as UserActions from '../../actions/users'

// Constants
import NAV_TITLES from '../../constants/navSections'

class App extends Component {
  displayName: "Main App Component";
  constructor(props) {
    super(props);
    this.state = {
      width: 500
    };
    this.handleNavBarClick = this._handleNavBarClick.bind(this)
  }

  componentDidMount() {
    this._getWindowWidth()
    this.props.userActions.getUsers()
  }

  _getWindowWidth() {
    let dom = ReactDOM.findDOMNode(this);
    const width = dom.querySelectorAll('div.table-wrapper')[0].clientWidth - 15;    
    this.setState({width: width});
  }

  _handleNavBarClick(navIdx) {
    if (navIdx != this.props.activeNavIdx) {
      this.props.navActions.setNavSelection(navIdx)
    }
  }

  render() {
    const { navTitles, activeNavIdx, users } = this.props
    return (
      <div className="react-root">
        <Navbar 
          activeNavIdx={activeNavIdx}
          navTitles={navTitles} 
          onNavChange={this.handleNavBarClick}
        />
        <div className="container">
          <div className="row table-wrapper">
            <UserTable 
              users={users} 
              width={this.state.width}
            />
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  activeNavIdx: PropTypes.number.isRequired,
  navActions: PropTypes.object.isRequired,
  navTitles: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  userActions: PropTypes.object.isRequired,
  users: PropTypes.object.isRequired  
}

App.defaultProps = {
  navTitles: NAV_TITLES
}

function mapStateToProps(state) {
  return {
    users: state.users,
    activeNavIdx: state.nav
  }
}

function mapDispatchToProps(dispatch) {
  return {
    navActions: bindActionCreators(NavActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
