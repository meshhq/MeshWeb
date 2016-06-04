
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
    this.props.onActivate(provider, this.state)
  }

  render() {
    let handleActivate = this._handleActivate.bind(this, this.props.provider)

    let providerName = 'no-name'
    let logoURL = 'no-url'
    if (this.props.provider) {
      providerName = this.props.provider.name
      logoURL = this.props.provider.logo_url
    }

    let credentialRows = []
    if (this.props.provider != null) {
      let credentialInfo = this.props.provider.credentials
      for (let key in credentialInfo) {
        let handleChange = this._handleChange.bind(this, key)
        let value = credentialInfo[key]
        credentialRows.push(
          <Row className='provider-creds-row' key={value + '-row'}>
            <Col className='provider-creds-column' key={value + '-col'} md={12}>
              <Input label={value} onChange={handleChange} placeholder={'Enter' + value} type="text"/>
            </Col>
          </Row>
        )
      }
    }

    return (
      <div>
        <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
          <Modal.Header closeButton>
            <Modal.Title>{"Hubspot Credentials"}</Modal.Title>
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
            <Button bsStyle='success' onClick={handleActivate}>{"Save"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CredentialForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  onActivate: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  provider: PropTypes.object
}

CredentialForm.displayName = 'Credential Form';

export default CredentialForm
