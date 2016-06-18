
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import { browserHistory } from 'react-router'
import _ from 'underscore'

// Components
import ProviderCell from './ProviderCells'
import CredentialForm from '../Forms/CredentialForm'

// Actions
import * as IntegrationActions from '../../actions/integrations'
import * as ProviderActions from '../../actions/providers'

// Helpers
import { integrationIsSyncing } from '../../constants/integrationSyncStatus'

// HAWKSs
import { IntervalWrapper } from '../../hawks/interval'

class Providers extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleActivateClick = this._handleActivateClick.bind(this)
    this.handleSaveCredentials = this._handleSaveCredentials.bind(this)
    this.handleCloseCredentialForm = this._handleCloseCredentialForm.bind(this)
    this.registerOAuthProviderCB = this._registerOAuthProviderCB.bind(this)
    this.checkForIntegrationsCurrentlySyncing = this._checkForIntegrationsCurrentlySyncing.bind(this)
    this.handleSupplementalOAuthInfoGiven = this._handleSupplementalOAuthInfoGiven.bind(this)
    this.state = {
      credentialFormDisplayed: false,
      selectedProvider: null
    }

    // Check for active syncing integrations
    this.checkForIntegrationsCurrentlySyncing(props.integrationState.integrations)
  }

  componentDidMount() {
    // Calling the register method here to wait for the full render 
    // on setup
    // Check for OAuth Token on entry
    if (this.props.routeParams.callbackProvider) {
      this.registerOAuthProviderCB(this.props.routeParams.callbackProvider)
    }
  }

  componentDidUpdate() {
    this.checkForIntegrationsCurrentlySyncing(this.props.integrationState.integrations)
  }

  _checkForIntegrationsCurrentlySyncing(integrations) {
    let syncing = false
    _.each(integrations, (integration) => {

      const localSyncing = integrationIsSyncing(integration)
      syncing = syncing || localSyncing
    })

    // If we have an integration currently syncing,
    // begin polling the server every 3 sec
    if (syncing) {
      const syncFunc = this.props.integrationActions.refreshIntegrations
      this.props.setIntervalWithToken('providerSyncPolling', syncFunc, 3000)
    }
  }

  _registerOAuthProviderCB(provider) {
    // Launch Oauth Auth
    // Using the `keys` underscore js helper to detemine non-inherited 
    // key count
    if (_.keys(this.props.location.query).length > 0) {
      // URL Decode all Keys/Values
      let decodedQuery = _.mapObject(this.props.location.query, (val) =>
        decodeURIComponent(val)
      )
      this.props.providerActions.registerOAuthCodeWithMesh(provider, decodedQuery)
      browserHistory.push('/integrations')
    }
  }

  _handleActivateClick(providerID) {    
    let pro = this.props.providerState.providers.find(function(provider){
      return provider.id == providerID
    })
    
    // Check for OAuth Ability
    if (pro.oauth === true) {
      if (pro.credentials && pro.credentials.oauth_extra) {
        // We need extra info to accomplish this... uggh
        this.setState({
          selectedProvider: pro,
          credentialFormDisplayed: true
        });
      } else {
        // No extra info needed, let's roll
        
        this.props.providerActions.requestOAuthURL(pro.key).then((response) => {
          window.location = response
        })        
      }
    } else {
      this.setState({
        selectedProvider: pro,
        credentialFormDisplayed: true
      });
    }
  }

  _handleSaveCredentials(provider, params) {
    let integration = {
      'provider_type' : provider.type,
      'credentials' : params
    }

    this.props.integrationActions.createIntegration(integration)
    this.setState({
      credentialFormDisplayed: false
    });
  }

  _handleCloseCredentialForm() {
    this.setState({
      credentialFormDisplayed: false
    });
  }

  _handleSupplementalOAuthInfoGiven(provider, params) {
    this.props.providerActions.requestOAuthURL(provider.key, params).then((response) => {
      window.location = response
    })
  }

  render() {
    // Filter Mesh
    const filteredProviders = _.filter(this.props.providerState.providers, (provider) => 
      provider.name !== 'Mesh'
    )

    // Pack providers into sections
    let integrationsByType = {}
    for (let i = 0; i < this.props.integrationState.integrations.length; i++) {
      const integration = this.props.integrationState.integrations[i]
      integrationsByType[integration.provider_type] = integration
    }

    const providersSections = _.map(filteredProviders, (provider) => {
      const itegration = integrationsByType[provider.type]
      return (
        <ProviderCell
          color={provider.color}
          integration={itegration}
          key={provider.id}
          logoSrc={provider.logo_url} 
          onActivateClick={this.handleActivateClick}
          providerID={provider.id} 
          providerName={provider.name}
        />
      )
    })
    
    let forms = (
      <div className={'forms'}>
        <CredentialForm
          displayed={this.state.credentialFormDisplayed}
          onActivate={this.handleSaveCredentials}
          onCancel={this.handleCloseCredentialForm}
          onSubmitSupplementalOAuth={this.handleSupplementalOAuthInfoGiven}
          provider={this.state.selectedProvider}
        />
      </div>
    )

    // Pack the providers into 3 per row
    const providerRows = []
    const rowCount = (providersSections.length / 4) + 1
    for (let i = 0; i < rowCount; i++) {
      const providerBaseIdx = (i * 4)
      const rowContainer = []
      for (let x = 0; x < 4; x++) {
        const providerIdx = providerBaseIdx + x
        if (providerIdx < providersSections.length) {
          rowContainer.push(providersSections[providerIdx])
        }
      }
      providerRows.push(rowContainer)
    }

    const providerRowHTML = []
    for (let i = 0; i < providerRows.length; i++) {
      const pr = providerRows[i]
      providerRowHTML.push(
        <div className={'provider-row'} key={i}>
          {pr}
        </div>
      )
    }
    return (
      <div className="providers-component">
        <div className="forms">
          {forms}
        </div>
        <div className="provider-rows row">
          {providerRowHTML}
        </div>
      </div>
    )
  }
}

Providers.displayName = 'Providers List'

Providers.defaultProps = {
  providerActions: {},
  providerState: {}
}

Providers.propTypes = {
  integrationActions: PropTypes.object.isRequired,
  integrationState: PropTypes.object.isRequired,
  location: PropTypes.object.isRequired,
  providerActions: PropTypes.object.isRequired,
  providerState: PropTypes.object.isRequired,
  routeParams: PropTypes.object.isRequired,
  setIntervalWithToken: PropTypes.func.isRequired
}

function mapStateToProps(state) {
  return {
    providerState: state.providers,
    integrationState: state.integrations
  }
}

function mapDispatchToProps(dispatch) {
  return {
    integrationActions: bindActionCreators(IntegrationActions, dispatch),
    providerActions: bindActionCreators(ProviderActions, dispatch)
  }
}

// Wrapping the Provider component in a HOC
const WrappedProvider = IntervalWrapper(Providers)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedProvider)
