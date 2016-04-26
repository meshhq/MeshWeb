
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Input } from 'react-bootstrap'

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      value: ''
    };
    this.handleChange = this._handleChange.bind(this)
  }


  _handleChange(stateKey, e) {
    let value = e.target.value
    this.setState({
      stateKey: value
    });
  }

  render() {
    return (
      <div>
        <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
          <Modal.Header closeButton>
            <Modal.Title>{"New User"}</Modal.Title>
          </Modal.Header>


          <Modal.Body>
            <Input placeholder="First Name" type="text" onChange={this._handleChange.bind(this, 'firstName')}/>
            <Input placeholder="Last Name"type="text" onChange={this._handleChange.bind(this, 'lastName')}/>
            <Input placeholder="Email Address" type="text" onChange={this._handleChange.bind(this, 'email')}/>
            <Input placeholder="Phone Number" type="text" onChange={this._handleChange.bind(this, 'phone')}/>
            <Input placeholder="Company Name" type="text" onChange={this._handleChange.bind(this, 'company')}/>
            <Input placeholder="Website" type="text" onChange={this._handleChange.bind(this, 'website')}/>
          </Modal.Body>

          <Modal.Footer>
            <Button onClick={this.props.onCancel}>{"Cancel"}</Button>
            <Button bsStyle='success' onClick={this.props.onSave}>{"Save"}</Button>
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
