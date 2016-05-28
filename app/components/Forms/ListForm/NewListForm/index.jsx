import React, { Component, PropTypes } from 'react'
import { Modal, Grid, Row, Col, Input, Button } from 'react-bootstrap'

class NewListForm extends Component {

  _handleChange(key, event) {
    this.props.onChange(key, event)
  }

  _inputColumn(key, label) {
    let onChange = this._handleChange.bind(this, key)
    return (
      <Col md={12} ref={key}>
        <Input label={label} onChange={onChange} placeholder={'Enter ' +  label} type="text"/>
      </Col>
    );
  }

  render() {
    return (
      <div>
        <Modal.Header closeButton>
          <Modal.Title>{"New List"}</Modal.Title>
        </Modal.Header>

        <Modal.Body>
          <Grid fluid>
            <Row>
              {this._inputColumn('name', 'Name')}
            </Row>
            <Row>
              {this._inputColumn('description', 'Description')}
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

NewListForm.displayName = 'List Details';

NewListForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

export default NewListForm
