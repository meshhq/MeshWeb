
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'


// HAWKSs
import { IntervalWrapper } from '../../../hawks/interval'

// Actions
import * as UserActions from '../../../actions/users'
import * as IntegrationActions from '../../../actions/integrations'

// ID for tracking the polling w/ the token
const USER_POLLING_TOKEN = 'USER_POLLING_TOKEN'

// Transitions
//const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class UserDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Integration Sync State
    this.checkForIntegrationsCurrentlySyncing = this._checkForIntegrationsCurrentlySyncing.bind(this)

    // Setup our data
    this.state = {
      detailUser: {}
    };
  }

  // First: Mounted
  componentDidMount() {
    
  }

  // First: Received props
  componentWillReceiveProps() {
    
  }

  // Checks for currently syncing integrations
  _checkForIntegrationsCurrentlySyncing() {
    if (this.props.integrationState.isSyncing) {
      const syncFunc = this.props.userActions.refreshUsers
      this.props.setIntervalWithToken(USER_POLLING_TOKEN, syncFunc, 3000)
    } else {
      this.props.removeIntervalWithToken(USER_POLLING_TOKEN)
    }
  }

  render() {
    return (
      <div className="user-detail-component">
        <div className="container-row row">
          <div className="col-xs-12 col-sm-3 leading-continer">
          </div>
          <div className="col-xs-12 col-sm-6 main-continer">
          </div>
          <div className="col-xs-12 col-sm-3 trailing-container">
          </div>
        </div>
      </div>
    );
  }
}

UserDetail.displayName = 'User Detail';

UserDetail.defaultProps = {
  user: {}
}

UserDetail.propTypes = {
  integrationActions: PropTypes.object.isRequired,
  integrationState: PropTypes.object.isRequired,
  listState: PropTypes.object.isRequired,
  providerState: PropTypes.object.isRequired,
  removeIntervalWithToken: PropTypes.func.isRequired,
  setIntervalWithToken: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    integrationState: state.integrations,
    listState: state.lists,
    providerState: state.providers,
    userState: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    integrationActions: bindActionCreators(IntegrationActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

// Wrapping the Provider component in a HOC
const WrappedUserDetail = IntervalWrapper(UserDetail)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUserDetail)
