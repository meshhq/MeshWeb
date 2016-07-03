import React, { Component, PropTypes } from 'react'
import { Modal, Grid, Row, Col, Input, Button } from 'react-bootstrap'

class NewOrganizationForm extends Component {

  _handleChange(key, event) {
    this.props.onChange(key, event)
  }

  _inputColumn(key, label) {
    let onChange = this._handleChange.bind(this, key)
    return (
      <Col md={6} ref={key}>
        <Input label={label} onChange={onChange} placeholder={'Enter ' +  label} type="text"/>
      </Col>
    );
  }

  _descriptionColumn(key, label, defaultValue) {
    let onChange = this._handleChange.bind(this, key)
    return (
      <Col md={12} ref={key}>
        <Input defaultValue={defaultValue} label={label} onChange={onChange} type="text"/>
      </Col>
    );
  }

  render() {
    return (
      <div>
        <Modal.Header closeButton={true}>
          <Modal.Title>{"New Organization"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Grid fluid={true}>
            <Row>
              {this._inputColumn('name', 'Organization Name')}
              {this._inputColumn('website', 'Website')}
            </Row>
            <Row>
              {this._inputColumn('size', 'Size')}
              {this._inputColumn('industry', 'Industry')}
            </Row>
            <Row>
              {this._descriptionColumn('description', 'Description')}
            </Row>
          </Grid>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onCancel}>{"Cancel"}</Button>
          <Button bsStyle='success' onClick={this.props.onSave}>{"Save"}</Button>
        </Modal.Footer>
      </div>
    );
  }
}

NewOrganizationForm.displayName = 'Organization Details';

NewOrganizationForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default NewOrganizationForm
