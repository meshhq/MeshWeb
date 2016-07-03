
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Alert } from 'react-bootstrap'

class DeleteForm extends Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div>
        <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
          <Modal.Header closeButton={true}>
            <Modal.Title>{"Error"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Alert bsStyle="danger">
              <strong>{this.props.error}</strong>
            </Alert>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onOK}>{"OK"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

DeleteForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  error: PropTypes.string.isRequired,
  onOK: PropTypes.func.isRequired
}

DeleteForm.displayName = 'Delete Form';

export default DeleteForm
