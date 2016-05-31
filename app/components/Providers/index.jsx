
import React, { PropTypes, Component } from 'react'
import ProviderCell from './ProviderCells'
import _ from 'lodash'
import { Grid, Row } from 'react-bootstrap'

import CredentialForm from '../Forms/CredentialForm'

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
    let pro = this.props.providers.find(function(provider){
      return provider.id == providerID
    })
    this.setState({
      selectedProvider: pro,
      credentialFormDisplayed: true
    });
  }

  _handleSaveCredentials() {
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
    const providersSections = _.map(this.props.providers, (provider) => {
      return (
        <ProviderCell key={provider.id} logoSrc={provider.logo_url} onActivateClick={this.handleActivateClick} providerID={provider.id} providerName={provider.name}/>
      )
    })

    let forms = (
      <div className={'forms'}>
        <CredentialForm
          displayed={this.state.credentialFormDisplayed}
          onCancel={this.handleCloseCredentialForm}
          onSave={this.handleSaveCredentials}
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
      <Grid fluid>
        {forms}
        {providerRowHTML}
      </Grid>
    )
  }
}

Providers.defaultProps = {
  provider: {}
}

Providers.propTypes = {
  providers: PropTypes.array.isRequired
}

Providers.displayName = 'Providers List'

export default Providers
