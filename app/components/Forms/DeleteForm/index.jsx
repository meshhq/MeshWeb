
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Alert } from 'react-bootstrap'

class DeleteForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this._handleChange.bind(this)
    this.handleDelete = this._handleDelete.bind(this)
  }


  _handleChange(stateKey, e) {
    let value = e.target.value
    this.setState({
      stateKey: value
    });
  }

  _handleDelete() {
    this.props.onDelete(this.state)
  }

  render() {
    return (
      <div>
        <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
          <Modal.Header closeButton>
            <Modal.Title>{"Delete List?"}</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <Alert bsStyle="danger">
              <strong>{'Are you sure you want to delete this list? '}</strong>{'This operation cannot be undone.'}
            </Alert>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onCancel}>{"Cancel"}</Button>
            <Button bsStyle='danger' onClick={this.handleDelete}>{"Delete"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

DeleteForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onDelete: PropTypes.func.isRequired
}

DeleteForm.displayName = 'Delete Form';

export default DeleteForm
