
import { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'
import _ from 'underscore'

// Components
import NavBar from '../../components/NavBar'
import NavPane from '../../components/NavPane'
import LoadingHud from '../../components/Shared/LoadingHud'

// Actions
import * as AppActions from '../../actions/application'
import * as ListActions from '../../actions/lists'
import * as OrganizationActions from '../../actions/organizations'
import * as IntegrationActions from '../../actions/integrations'
import * as UserActions from '../../actions/users'

class App extends Component {
  displayName: "Main App Component";
  constructor(props, context) {
    super(props, context);
    this.state = {
      width: 500,
      initialLoad: false,
      mounted: false,
      showLogin: false,
      loadError: false
    };
    this.getWindowWidth = this._getWindowWidth.bind(this)
    this.loadingText = this._loadingText.bind(this)
    this.handleResize = this._handleResize.bind(this)
    this.mounted = false
  }

  componentDidMount() {
    this.mounted = true
    this._performInitialSyncWithMesh()
    this._getWindowWidth()

    // TODO: Fix Long Polling with server push.
    // TH - Turning off for now
    // Also, we should be recording interval IDs here
    // setInterval(this.props.userActions.refreshUsers, 20000);
    // setInterval(this.props.organizationActions.refreshOrganizations, 20000);
    // setInterval(this.props.listActions.refreshLists, 20000);

    // Listen for the window size change
    window.addEventListener('resize', this.handleResize);
  }

  componentWillUnmount() {
    this.mounted = false
    window.removeEventListener('resize', this.handleResize);
  }

  _handleResize() {
    this.getWindowWidth()
  }

  /**
   * Helper for determining the viewport width after
   * component mount. Needed for the FB table to calc correctly
   */
  _performInitialSyncWithMesh() {
    this.props.appActions.fetchAppIdIfNeeded().then(() => {
      this.setState({ initialLoad: true, loadText: 'mesh is loading', loadError: false })
    }, () => {
      if (this.mounted) {
        this.setState({ initialLoad: false, loadError: true }) 
      }
    })
  }

  /**
   * Helper for determining the viewport width after
   * component mount. Needed for the FB table to calc correctly
   */
  _getWindowWidth() {
    let dom = ReactDOM.findDOMNode(this)
    const height = dom.querySelectorAll('div.container-wrapper')[0].clientHeight
    const width = dom.querySelectorAll('div.container-wrapper')[0].clientWidth
    this.setState({ containerWidth: width, containerHeight: height })
  }

  /**
   * loadingText listens to each state's 
   * @return {[type]} [description]
   */
  _loadingText() {
    const { userState, providerState } = this.props
    const appStates = [userState, providerState]
    for (let i = 0; i < appStates.length; i++) {
      const appState = appStates[i]
      if (_.isString(appState.hudMessage) && appState.hudMessage.length > 0) {
        return appState.hudMessage
      }
    }
    return ''
  }

  /**
   * We use this to determine whether the app is
   * still loading its content. We display a loading hud if not
   * @return {[JSX HTML]} [App Main Content]
   */
  _contentForApp() {
    const loadingText = this.loadingText()
    if (this.state.initialLoad == false) {
      return (
        <LoadingHud loadError={this.state.loadError} loadText={loadingText}/>
      )
    } else {
      // Inject props into children
      const { containerWidth, containerHeight } = this.state
      const childrenWithProps = React.Children.map(this.props.children, (child) => 
        React.cloneElement(child, {
          containerWidth: containerWidth,
          containerHeight: containerHeight
        })
      )
      return (
        <div className="inner-content-container">
          <LoadingHud loadError={this.state.loadError} loadText={loadingText}/>
          {childrenWithProps}
        </div>
      )
    }
  }

  render() {
    const { location } = this.props
    const { pathname } = location
    const appContent = this._contentForApp()
    return (
      <div className="react-root">
        <div className='top-nav-wrapper'>
          <NavBar onNavChange={this.handleNavBarClick} user={this.props.sessionState.user} />
        </div>
        <div className='content-wrapper'>
          <NavPane currentPath={pathname} />
          <div className="container-wrapper">
            <div className="container-fluid">
              {appContent}
            </div>
          </div>
        </div>
      </div>
    )
  }
}

App.propTypes = {
  appActions: PropTypes.object.isRequired,
  children: PropTypes.object.isRequired,
  integrationActions: PropTypes.object.isRequired,
  listActions: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  organizationActions: PropTypes.object.isRequired,
  providerState: PropTypes.object.isRequired,
  sessionState: PropTypes.object.isRequired,
  userActions: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
}

App.defaultProps = {
  providers: []
}

function mapStateToProps(state) {
  return {
    appState: state.app,
    providerState: state.providers,
    integrationState: state.integrations,
    sessionState: state.session,
    userState: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    appActions: bindActionCreators(AppActions, dispatch),
    listActions: bindActionCreators(ListActions, dispatch),
    organizationActions: bindActionCreators(OrganizationActions, dispatch),
    integrationActions: bindActionCreators(IntegrationActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(App)
