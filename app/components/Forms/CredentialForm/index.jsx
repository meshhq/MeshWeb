
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Grid, Row, Col, Input } from 'react-bootstrap'

class CredentialForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
  }

  _handleChange(stateKey, event) {
    let value = event.target.value
    let state = {};
    state[stateKey] = value;
    this.setState( state )
  }

  _handleActivate(provider) {
    if (this.props.provider.credentials && this.props.provider.credentials.oauth_extra) {
      const extraInfo = this.extraInfoRef.refs.input.value
      if (extraInfo.length > 0) {
        const { oauth_extra_key } = this.props.provider.credentials
        let keyValue = {}
        keyValue[oauth_extra_key] = extraInfo
        this.props.onSubmitSupplementalOAuth(provider, keyValue)
      }
    } else {
      this.props.onActivate(provider, this.state)
    }
  }

  render() {
    const modalTitle = this.props.provider ? this.props.provider.name + ' Credentials' : null
    let handleActivate = this._handleActivate.bind(this, this.props.provider)

    let providerName = 'no-name'
    let logoURL = 'no-url'
    if (this.props.provider) {
      providerName = this.props.provider.name
      logoURL = this.props.provider.logo_url
    }

    let credentialRows = []
    if (this.props.provider != null) {
      // Check if this is being used as a supplemental oauth form
      if (this.props.provider.credentials && this.props.provider.credentials.oauth_extra) {
        let credentialInfo = this.props.provider.credentials
        const value = this.props.provider.credentials.oauth_extra_prop
        
        // Making a ref for email and pass
        const extraInfoRef = (ref) => this.extraInfoRef = ref
        credentialRows.push(
          <Row className='provider-creds-row'>
            <Col className='provider-creds-column' md={12}>
              <p className="oauth-instructions">{credentialInfo.instructions}</p>
              <img className="instructions-img img-responsive" src={credentialInfo['instructions_img']} />
              <Input className="oauth-extra-input" label={value} placeholder={'Enter ' + value} ref={extraInfoRef} type="text"/>
            </Col>
          </Row>
        )        
      } else {
        // Provider is using std credentials
        let credentialInfo = this.props.provider.credentials
        for (let key in credentialInfo) {
          let handleChange = this._handleChange.bind(this, key)
          let value = credentialInfo[key]
          credentialRows.push(
            <Row className='provider-creds-row' key={value + '-row'}>
              <Col className='provider-creds-column' key={value + '-col'} md={12}>
                <Input label={value} onChange={handleChange} placeholder={'Enter ' + value} type="text"/>
              </Col>
            </Row>
          )
        }
      }

    }

    return (
      <Modal className="credentials-form" onHide={this.handleCloseClick} show={this.props.displayed}>
        <Modal.Header closeButton>
          <Modal.Title>{modalTitle}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Grid fluid>
            <Row className='provider-img-row' key={providerName}>
              <Col className='provider-img-column' key={providerName} md={12}>
                <img className="logo-img" src={logoURL} />
              </Col>
            </Row>
            {credentialRows}
          </Grid>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onCancel}>{"Cancel"}</Button>
          <Button bsStyle='success' onClick={handleActivate}>{"Submit"}</Button>
        </Modal.Footer>
      </Modal>
    );
  }
}

CredentialForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  onActivate: PropTypes.func,
  onCancel: PropTypes.func.isRequired,
  onSubmitSupplementalOAuth: PropTypes.func,
  provider: PropTypes.object
}

CredentialForm.displayName = 'Credential Form';

export default CredentialForm
