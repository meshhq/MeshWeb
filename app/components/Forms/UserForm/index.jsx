
import React, { Component } from 'react'
import { Button, Modal, Input, Col} from 'react-bootstrap';

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.close = this._close.bind(this)
    this.open = this._open.bind(this)
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
        <Modal show={this.props.displayed} onHide={this.close}>
          <Modal.Header closeButton>
            <Modal.Title>New User</Modal.Title>
          </Modal.Header>
          <Modal.Body>
              <Col md={6}>
                <Input
                  type="text"
                  placeholder="K Name"
                  ref="input"
                />
                <Input
                  type="text"
                  placeholder="Last Name"
                  ref="input"
                />
              </ Col>

              <Col md={6}>
                <Input
                  type="text"
                  placeholder="First Name"
                  ref="input"
                />
                <Input
                  type="text"
                  placeholder="Email Address"
                  ref="input"
                />
              </ Col>
              <Col md={12}>
              <Input
                type="text"
                placeholder="Last Name"
                ref="input"
              />
              <Input
                type="text"
                placeholder="Email Address"
                ref="input"
              />
            </Col>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.close}>Close</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

export default UserForm
