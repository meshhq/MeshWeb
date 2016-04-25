
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Input, Col } from 'react-bootstrap'

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.handleCloseClick = this._close.bind(this)
    this.handleOpenClick = this._open.bind(this)
  }

  _close() {
    this.setState({ displayed: false });
  }

  _open() {
    this.setState({ displayed: true });
  }

  render() {
    return (
      <div>
        <Modal
          onHide={this.handleCloseClick}
          show={this.props.displayed}
        >
          <Modal.Header closeButton>
            <Modal.Title>
              {"New User"}
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Col md={6}>
              <Input
                placeholder="K Name"
                type="text"
              />
              <Input
                placeholder="Last Name"
                type="text"
              />
            </ Col>

            <Col md={6}>
              <Input
                placeholder="First Name"
                type="text"
              />
              <Input
                placeholder="Email Address"
                type="text"
              />
            </ Col>

            <Col md={12}>
              <Input
                placeholder="Last Name"
                type="text"
              />
              <Input
                placeholder="Email Address"
                type="text"
              />
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleCloseClick}>{"Close"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

UserForm.propTypes = {
  displayed: PropTypes.bool.isRequired
}


UserForm.displayName = 'User Form';

export default UserForm
