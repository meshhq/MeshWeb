
import React, { PropTypes, Component } from 'react'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'lodash'

// Components
import ProviderCell from './ProviderCells'
import { Row } from 'react-bootstrap'
import CredentialForm from '../Forms/CredentialForm'

// Actions
import * as IntegrationActions from '../../actions/integrations'
import * as ProviderActions from '../../actions/providers'

class Providers extends Component {
  constructor(props, context) {
    super(props, context)

    this.handleActivateClick = this._handleActivateClick.bind(this)
    this.handleSaveCredentials = this._handleSaveCredentials.bind(this)
    this.handleCloseCredentialForm = this._handleCloseCredentialForm.bind(this)

    this.state = {
      credentialFormDisplayed: false,
      selectedProvider: null
    };
  }

  _handleActivateClick(providerID) {
    let pro = this.props.providerState.providers.find(function(provider){
      return provider.id == providerID
    })
    
    // Check for OAuth Ability
    if (pro.oauth === true) {
      this.props.providerActions.requestedOAuthForProvider()
      // this.props.providerActions.requestOAuthURL(pro.key).then((response) => {
      //   this.props.providerActions.requestedOAuthForProvider()
      //   window.location = response
      // })
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

  render() {
    // Filter Mesh
    const filteredProviders = _.filter(this.props.providerState.providers, (provider) => {
      return provider.name !== 'Mesh'
    })

    // Pack providers into sections
    const providersSections = _.map(filteredProviders, (provider) => {
      return (
        <ProviderCell key={provider.id} logoSrc={provider.logo_url} onActivateClick={this.handleActivateClick} providerID={provider.id} providerName={provider.name}/>
      )
    })

    let forms = (
      <div className={'forms'}>
        <CredentialForm
          displayed={this.state.credentialFormDisplayed}
          onActivate={this.handleSaveCredentials}
          onCancel={this.handleCloseCredentialForm}
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
        <Row className={'provider-row'} key={i}>
          {pr}
        </Row>
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
  providerActions: PropTypes.object.isRequired,
  providerState: PropTypes.object.isRequired
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

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(Providers)

