
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Grid, Row, Col } from 'react-bootstrap'

class ProviderForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this._handleChange.bind(this)
    this.handlePublish = this._handlePublish.bind(this)
  }


  _handleChange(stateKey, e) {
    let value = e.target.value
    this.setState({
      stateKey: value
    });
  }

  _handlePublish() {
    this.props.onPublish(this.state)
  }

  render() {
    return (
      <div>
        <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
          <Modal.Header closeButton>
            <Modal.Title>{"Publis List"}</Modal.Title>
          </Modal.Header>


          <Modal.Body>
            <Grid>
              <Row>
                <Col className='provider-column' md={2} mdPull={0}>
                  <input type="radio" aria-label="..." />
                  <img className="logo-img" src={this.props.logoSrc} />
                  <p>{'Spotify'}</p>
                </Col>
                <Col className='provider-column' md={2} mdPush={0}>
                  <input type="radio" aria-label="..." />
                  <img className="logo-img" src={this.props.logoSrc} />
                  <p>{'Spotify'}</p>
                </Col>
              </Row>
              <Row>
                <Col md={2} mdPull={0}>
                  <input type="radio" aria-label="..." />
                  <img className="logo-img" src={this.props.logoSrc} />
                  <h3>{'Spotify'}</h3>
                </Col>
                <Col md={2} mdPush={0}>
                  <input type="radio" aria-label="..." />
                  <img className="logo-img" src={this.props.logoSrc} />
                  <h3>{'Spotify'}</h3>
                </Col>
              </Row>
            </Grid>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onCancel}>{"Cancel"}</Button>
            <Button bsStyle='success' onClick={this.handlePublish}>{"Delete"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ProviderForm.propTypes = {
  providers: PropTypes.object.isRequired,
  displayed: PropTypes.bool.isRequired,
  logoSrc: PropTypes.string.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired
}

ProviderForm.displayName = 'Provider Form';

export default ProviderForm
