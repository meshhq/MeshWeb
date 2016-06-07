
import { Component, PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import React from 'react'

// Components
import NavBar from '../../components/NavBar'
import NavPane from '../../components/NavPane'
import ProgressView from '../../components/Shared/ProgressView'


// Actions
import * as AppActions from '../../actions/application'
import * as ListActions from '../../actions/lists'
import * as OrganizationActions from '../../actions/organizations'
import * as IntegrationActions from '../../actions/integrations'
import * as UserActions from '../../actions/users'

class App extends Component {
  displayName: "Main App Component";
  constructor(props) {
    super(props);
    this.state = {
      width: 500,
      initialLoad: false,
      loadingText: '',
      showLogin: false,
      loadError: false
    };
  }

  componentDidMount() {
    this._performInitialSyncWithMesh()
    this._getWindowWidth()

    // TODO: Fix Long Polling with server push.
    setInterval(this.props.userActions.refreshUsers, 20000);
    setInterval(this.props.organizationActions.refreshOrganizations, 20000);
    setInterval(this.props.listActions.refreshLists, 20000);
  }

  /**
   * Helper for determining the viewport width after
   * component mount. Needed for the FB table to calc correctly
   */
  _performInitialSyncWithMesh() {
    this.props.appActions.fetchAppIdIfNeeded().then(() => {
      this.setState({ initialLoad: true, loadText: 'mesh is loading', loadError: false })
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
    const height = dom.querySelectorAll('div.container-wrapper')[0].clientHeight
    const width = dom.querySelectorAll('div.container-wrapper')[0].clientWidth
    this.setState({ containerWidth: width, containerHeight: height })
  }

  /**
   * We use this to determine whether the app is
   * still loading its content. We display a loading hud if not
   * @return {[JSX HTML]} [App Main Content]
   */
  _contentForApp() {
    if (this.state.initialLoad == false) {
      return (
        <ProgressView loadError={this.state.loadError} loadText={this.state.loadingText}/>
      )
    } else {
      // Inject props into children
      const { containerWidth, containerHeight } = this.state
      const childrenWithProps = React.Children.map(this.props.children, (child) => {
        return React.cloneElement(child, {
          containerWidth: containerWidth,
          containerHeight: containerHeight
        })
      })
      return (
        <div>
          <ProgressView loadError={this.state.loadError} loadText={this.state.loadingText}/>
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
          <NavBar accountName="Kevin" onNavChange={this.handleNavBarClick} />
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
  userActions: PropTypes.object.isRequired
}

App.defaultProps = {
  providers: []
}

function mapStateToProps(state) {
  return {
    appState: state.app
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
