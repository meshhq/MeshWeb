import React, { Component, PropTypes } from 'react'
import { Modal, Grid, Row, Col, Input, Button } from 'react-bootstrap'

class NewUserForm extends Component {

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

  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>{"New User"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Grid fluid>
            <Row>
              {this._inputColumn('first_name', 'First Name')}
              {this._inputColumn('last_name', 'Last Name')}
            </Row>
            <Row>
              {this._inputColumn('email', 'Email')}
              {this._inputColumn('phone', 'Phone')}
            </Row>
            <Row>
              {this._inputColumn('organization_name', 'Organization Name')}
              {this._inputColumn('website', 'Website')}
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

NewUserForm.displayName = 'New User';

NewUserForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default NewUserForm
