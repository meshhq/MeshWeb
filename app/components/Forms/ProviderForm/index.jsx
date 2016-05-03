
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Grid, Row, Col } from 'react-bootstrap'

class ProviderForm extends Component {
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
    this.props.providers.map(function(provider) {
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

  _splitProviders() {
    let increment = 0;
    let rowCount = (this.props.providers.length / 2);
    let providerPairs = [];
    for (let row = 0; row < rowCount; row++) {
      let index = row + increment
      if (this.props.providers.length > index) {
        let pair = [this.props.providers[index], this.props.providers[index + 1]];
        providerPairs.push(pair)
      }
      increment++
    }
    return providerPairs
  }

  _generateColumns() {
    let test = this.handleChange

    // Itterate over all button supplied to the class to build the action group.
    let columnCount = 0;
    let splitProviders = this._splitProviders()
    let providerColumns = splitProviders.map(function(providers) {
      let colums = [];
      if (providers.length > 0) {
        let provider = providers[0]
        colums.push(
          <Col className='provider-column' key={provider.name} md={6} ref={provider['id']}>
            <input className='provider-radio' aria-label="..." id={provider['name']} onChange={test} type={'radio'} />
            <img className="logo-img" src={provider['logo_url']} />
            <p className='provider-name'>{provider['name']}</p>
          </Col>
        )
      }
      if (providers.length > 1) {
        let provider = providers[1]
        colums.push(
          <Col className='provider-column' key={provider.name} md={6} ref={provider['id']}>
            <input className='provider-radio' aria-label="..." id={provider['name']} onChange={test} type={'radio'} />
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
    let providerColumns = this._generateColumns()
    return (
      <div>
        <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
          <Modal.Header closeButton>
            <Modal.Title>{"Publish List"}</Modal.Title>
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
