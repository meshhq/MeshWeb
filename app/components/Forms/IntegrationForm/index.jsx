
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Grid, Row, Col } from 'react-bootstrap'

class IntegrationForm extends Component {
  constructor(props) {
    super(props);
    this.resetState = this._resetState.bind(this)
    this.handleChange = this._handleChange.bind(this)
    this.handlePublish = this._handlePublish.bind(this)
    this.state = this._initialState()
  }

  _resetState() {
      this.state = this._initialState()
  }

  _initialState() {
    let state = {};
    this.props.integrations.map(function(provider) {
      let type = provider['name']
      state[type] = false;
    });
    return state
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

  _splitIntegrations() {
    let integrationPairs = [];
    for (let i = 0; i < this.props.integrations.length; i++) {
      if (i % 2 == 0) {
        integrationPairs.push([])
      }

      const currentPairGroup = integrationPairs[Math.floor(i / 2)]
      currentPairGroup.push(this.props.integrations[i])
    }
    return integrationPairs
  }

  _generateColumns() {
    let test = this.handleChange

    // Itterate over all button supplied to the class to build the action group.
    let columnCount = 0;
    let splitIntegrations = this._splitIntegrations()
    let providerColumns = splitIntegrations.map(function(providers) {
      let colums = [];
      if (providers.length > 0) {
        let provider = providers[0]
        colums.push(
          <Col className='provider-column' key={provider.name} md={6} ref={provider['id']}>
            <input aria-label="..." className='provider-radio'  id={provider['name']} onChange={test} type={'radio'} />
            <img className="logo-img" src={provider['logo_url']} />
            <p className='provider-name'>{provider['name']}</p>
          </Col>
        )
      }
      if (providers.length > 1) {
        let provider = providers[1]
        colums.push(
          <Col className='provider-column' key={provider.name} md={6} ref={provider['id']}>
            <input aria-label="..." className='provider-radio' id={provider['name']} onChange={test} type={'radio'} />
            <img className="logo-img" src={provider['logo_url']} />
            <p className='provider-name'>{provider['name']}</p>
          </Col>
        )
      }
      columnCount++
      return (
        <Row className='provider-row' key={columnCount}>
          {colums}
        </Row>
      )
    });
    return providerColumns
  }

  render() {
    let integrationColumns = this._generateColumns()
    return (
      <div>
        <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
          <Modal.Header closeButton>
            <Modal.Title>{"Publish List"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Grid fluid>
              {integrationColumns}
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

IntegrationForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  integrations: PropTypes.array.isRequired,
  onCancel: PropTypes.func.isRequired,
  onPublish: PropTypes.func.isRequired
}

IntegrationForm.displayName = 'Integration Form';

export default IntegrationForm
