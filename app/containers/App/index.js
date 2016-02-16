
import { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

// Components
import Navbar from '../../components/Navbar'
import UserTable from '../../components/UserTable'
import Providers from '../../components/Providers'

// Actions
import * as AppActions from '../../actions/application'
import * as NavActions from '../../actions/nav'
import * as ProviderActions from '../../actions/providers'
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

    // Binding these to the current class
    this.handleNavBarClick = this._handleNavBarClick.bind(this)
  }
  
  componentDidMount() {
    this._getWindowWidth()
    this.props.appActions.fetchAppIdIfNeeded()
  }

  /**
   * Helper for determining the viewport width after 
   * component mount. Needed for the FB table to calc correctly
   */
  _getWindowWidth() {
    let dom = ReactDOM.findDOMNode(this)
    const width = dom.querySelectorAll('div.container')[0].clientWidth - 15
    this.setState({ width: width })
  }

  /**
   * Handling a nav bar click
   * @param  {Integer} navIdx
   */
  _handleNavBarClick(navIdx) {
    if (navIdx != this.props.activeNavIdx) {
      this.props.navActions.setNavSelection(navIdx)
    }
  }

  /**
   * CB for a provider cell switch toggle
   * @param  {String} providerId 
   * @param  {Bool}   on         
   */
  _providerWasToggled(providerId, on) {
    let foundProvider = null
    for (let i = 0; i < this.props.providerState.providers; i++) {
      let provider = this.props.providerState.providers[i]
      if (provider.id == providerId) {
        foundProvider = provider
        break
      }
    }
    
    if (foundProvider != null || on) {
      // TODO - ADJUST INTEGRATION 
    }
  }

  /**
   * Main window component switch
   * @param  {Integer} navIdx 
   * @return {[JSX HTML]} HTML for container
   */
  _appComponentForNavIdx(navIdx) {
    const { userState, providerState } = this.props
    switch(navIdx) {
      case 0:
        return (
          <UserTable 
            users={userState} 
            width={this.state.width}
          />
          )
      case 1:
        return (
          <Providers providerState={providerState}/>
          )
    }
  }

  render() {
    const { navTitles, activeNavIdx } = this.props
    return (
      <div className="react-root">
        <Navbar 
          activeNavIdx={activeNavIdx}
          navTitles={navTitles} 
          onNavChange={this.handleNavBarClick}
        />
        <div className="container">
          {this._appComponentForNavIdx(activeNavIdx)}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  activeNavIdx: PropTypes.number.isRequired,
  appActions: PropTypes.object.isRequired,
  navActions: PropTypes.object.isRequired,
  navTitles: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  providerActions: PropTypes.object.isRequired,
  providerState: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
}

App.defaultProps = {
  navTitles: NAV_TITLES,
  providers: []
}

function mapStateToProps(state) {
  return {
    activeNavIdx: state.nav,
    appState: state.app,
    providerState: state.providers,
    userState: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(AppActions, dispatch),
    navActions: bindActionCreators(NavActions, dispatch),
    providerActions: bindActionCreators(ProviderActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
