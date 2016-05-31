
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Grid, Row, Col, Input } from 'react-bootstrap'

class CredentialForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    let providerName = 'no-name'
    let logoURL = 'no-url'
    if (this.props.provider) {
      providerName = this.props.provider.name
      logoURL = this.props.provider.logo_url
    }
    return (
      <div>
        <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
          <Modal.Header closeButton>
            <Modal.Title>{"Publish List"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Grid fluid>
              <Row className='provider-img-row' key={providerName}>
                <Col className='provider-img-column' key={providerName} md={12}>
                  <img className="logo-img" src={logoURL} />
                </Col>
              </Row>
              <Row className='provider-creds-row' key={"columnCount"}>
                <Col className='provider-creds-column' key={"provider"} md={12}>
                  <Input defaultValue={"Test"} label={"Creds"} type="text"/>
                </Col>
              </Row>
              <Row className='provider-creds-row' key={"columnCount"}>
                <Col className='provider-creds-column' key={"provider"} md={12}>
                  <Input defaultValue={"Test"} label={"Creds"} type="text"/>
                </Col>
              </Row>
            </Grid>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onCancel}>{"Cancel"}</Button>
            <Button bsStyle='success' onClick={this.handlePublish}>{"Save"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

CredentialForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  provider: PropTypes.object
}

CredentialForm.displayName = 'Credential Form';

export default CredentialForm
