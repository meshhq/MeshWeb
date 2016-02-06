
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
  constructor(props) {
    super(props);
    this.state = {
      width: 500
    };
  }

  componentDidMount() {
    let dom = ReactDOM.findDOMNode(this);
    let width = dom.querySelectorAll('div.table-wrapper')[0].clientWidth - 15;
    this.setState({width: width});
  }

  render() {
    const { navTitles, activeNavIdx, users, children } = this.props
    return (
      <div className="react-root">
        <Navbar navTitles={navTitles} activeNavIdx={activeNavIdx}/>
        <div className="container">
          <div className="row table-wrapper">
            <UserTable users={users.users} width={this.state.width}/>
          </div>
        </div>
        {children}
      </div>
    )
  }
}

App.propTypes = {
  users: PropTypes.object.isRequired,
  navTitles: PropTypes.array.isRequired,
  activeNavIdx: PropTypes.number.isRequired
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
