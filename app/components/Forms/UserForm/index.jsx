
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Input } from 'react-bootstrap'

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this._handleChange.bind(this)
    this.handleSave = this._handleSave.bind(this)
  }


  _handleChange(stateKey, e) {
    let value = e.target.value
    let state = {};
    state[stateKey] = value;
    this.setState( state )
  }

  _handleSave() {
    this.props.onSave(this.state)
  }

  render() {
    return (
      <div>
        <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
          <Modal.Header closeButton>
            <Modal.Title>{"New User"}</Modal.Title>
          </Modal.Header>


          <Modal.Body>
            <Input onChange={this._handleChange.bind(this, 'first_name')} placeholder="First Name" type="text" />
            <Input onChange={this._handleChange.bind(this, 'last_name')} placeholder="Last Name" type="text" />
            <Input onChange={this._handleChange.bind(this, 'email')} placeholder="Email Address" type="text" />
            <Input onChange={this._handleChange.bind(this, 'phone')} placeholder="Phone Number" type="text" />
            <Input onChange={this._handleChange.bind(this, 'organization_name')} placeholder="Organization Name" type="text" />
            <Input onChange={this._handleChange.bind(this, 'website')} placeholder="Website" type="text" />
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onCancel}>{"Cancel"}</Button>
            <Button bsStyle='success' onClick={this.handleSave}>{"Save"}</Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}

UserForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

UserForm.displayName = 'User Form';

export default UserForm
