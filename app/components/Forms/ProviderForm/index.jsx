
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Grid, Row, Col } from 'react-bootstrap'

class ProviderForm extends Component {
  constructor(props) {
    super(props);
    this.resetState = this._resetState.bind(this)
    this.handleChange = this._handleChange.bind(this)
    this.handlePublish = this._handlePublish.bind(this)
    this.resetState()
  }

  _resetState() {
    let state = {};
    this.props.providers.map(function(provider) {
      let type = provider['type']
      state[type] = false;
    });
    this.state = state
  }

  _handlePublish() {
    this.props.onPublish(this.state)
  }

  _handleChange(e) {
    let checked = this.state[e.target.id]
    let state = {};
    if (!checked && e.target.checked) {
      state[e.target.id] = true;
      e.target.checked = true;
      this.setState( state )
    } else {
      state[e.target.id] = false;
      e.target.checked = false;
      this.setState( state )
    }
  }

  render() {
    let test = this.handleChange

    // Itterate over all button supplied to the class to build the action group.
    let providerColumns = this.props.providers.map(function(provider) {
      let type = provider['type']
      return (
        <Row>
          <Col className='provider-column' ref={provider['id']} md={6}>
            <div className='provider-container'>
              <input id={type} ref={'test'} type="radio" aria-label="..." onChange={test}/>
              <img className="logo-img" src={provider['logo_url']} />
              <p>{provider['name']}</p>
            </div>
          </Col>
        </Row>
      )
    });

    return (
      <div>
        <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
          <Modal.Header closeButton>
            <Modal.Title>{"Publis List"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Grid fluid>
              {providerColumns}
            </Grid>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onCancel}>{"Cancel"}</Button>
            <Button bsStyle='success' onClick={this.handlePublish}>{"Publish"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

ProviderForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired,
  providers: PropTypes.array.isRequired
}

ProviderForm.displayName = 'Provider Form';

export default ProviderForm
