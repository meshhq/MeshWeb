
import { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

// Components
import Lists from '../../components/Lists'
import NavBar from '../../components/NavBar'
import NavPane from '../../components/NavPane'
import Organizations from '../../components/Organizations'
import Providers from '../../components/Providers'
import ProgressView from '../../components/Shared/ProgressView'
import UserTable from '../../components/UserTable'

// Actions
import * as AppActions from '../../actions/application'
import * as ListActions from '../../actions/lists'
import * as NavActions from '../../actions/nav'
import * as NavPaneActions from '../../actions/NavPane'
import * as OrgActions from '../../actions/organizations'
import * as ProviderActions from '../../actions/providers'
import * as UserActions from '../../actions/users'

// Constants
import NAV_TITLES from '../../constants/navSections'

class App extends Component {
  displayName: "Main App Component";
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      initialLoad: false,
      showLogin: false,
      loadError: false
    };

    // Binding these to the current class
    this.handleNavBarClick = this._handleNavBarClick.bind(this)
    this.handleNavPaneClick = this._handleNavPaneClick.bind(this)
  }

  componentDidMount() {
    this._getWindowWidth()
    this._performInitialSyncWithMesh()
  }

  /**
   * Helper for determining the viewport width after
   * component mount. Needed for the FB table to calc correctly
   */
  _performInitialSyncWithMesh() {
    this.props.appActions.fetchAppIdIfNeeded().then(() => {
      this.setState({ initialLoad: true })
    }, () => {
      this.setState({ initialLoad: false, loadError: true })
    })
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
   * NAV
   */

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
   * Handling a nav pane click
   * @param  {Integer} navIdx
   */
  _handleNavPaneClick(navIdx) {
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
  _appComponentForCurrentNavIdx() {
    const { userState, providerState, activeNavIdx, listState, organizationState } = this.props
    switch(activeNavIdx) {
      case 0:
        return (
          <UserTable
            users={userState}
            width={this.state.width}
          />
          )
      case 1:
        return (
          <Organizations
            organizations={organizationState.organizations}
            providers={providerState.providers}
            width={this.state.width}
          />
          )
      case 2:
        return (
          <Lists lists={listState.lists}
            providers={providerState.providers}
          />
          )
      case 3:
        return (
          <Providers providerState={providerState}/>
          )

    }
  }

  /**
   * We use this to determine whether the app is
   * still loading its content. We display a loading hud if not
   * @return {[JSX HTML]} [App Main Content]
   */
  _contentForApp() {
    if (this.state.initialLoad == false) {
      return (
        <ProgressView loadError={this.state.loadError}/>
      )
    } else {
      return (
        <div>
          {this._appComponentForCurrentNavIdx()}
        </div>
      )
    }
  }

  render() {
    const { navTitles, activeNavIdx } = this.props
    const appContent = this._contentForApp()
    return (
      <div className="react-root">
        <NavBar
          accountName="KEVIN COLEMAN"
          activeNavIdx={activeNavIdx}
          navTitles={navTitles}
          onNavChange={this._handleNavBarClick}
        />
        <NavPane
          activeNavIdx={activeNavIdx}
          onNavChange={this.handleNavPaneClick}
        />
        <div className="container-wrapper">
          {appContent}
        </div>
      </div>
    )
  }
}

App.propTypes = {
  activeNavIdx: PropTypes.number.isRequired,
  appActions: PropTypes.object.isRequired,
  listActions: PropTypes.object.isRequired,
  listState: PropTypes.object.isRequired,
  navActions: PropTypes.object.isRequired,
  navPaneActions: PropTypes.object.isRequired,
  navTitles: PropTypes.arrayOf(React.PropTypes.string).isRequired,
  organizationActions: PropTypes.object.isRequired,
  organizationState: PropTypes.object.isRequired,
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
    listState: state.lists,
    organizationState: state.organizations,
    providerState: state.providers,
    userState: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(AppActions, dispatch),
    listActions: bindActionCreators(ListActions, dispatch),
    navActions: bindActionCreators(NavActions, dispatch),
    navPaneActions: bindActionCreators(NavPaneActions, dispatch),
    organizationActions: bindActionCreators(OrgActions, dispatch),
    providerActions: bindActionCreators(ProviderActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
