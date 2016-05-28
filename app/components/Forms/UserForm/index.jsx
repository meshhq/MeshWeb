
import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import UserDetailForm from './UserDetailForm'
import NewUserForm from './NewUserForm'

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {}
    this.handleChange = this._handleChange.bind(this)
    this.handleSave = this._handleSave.bind(this)
    this.handleUpdate = this._handleUpdate.bind(this)
  }

  _handleChange(stateKey, event) {
    let value = event.target.value
    let state = {};
    state[stateKey] = value;
    this.setState( state )
  }

  _handleSave() {
    this.props.onSave(this.state)
  }

  _handleUpdate() {
    this.props.onUpdate(this.state)
  }

  _newUserModal() {
    return (
      <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
        <NewUserForm onCancel={this.props.onCancel} onChange={this.handleChange} onSave={this.handleSave}/>
      </Modal>
    );
  }

  _userDetailModal() {
    return (
      <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
        <UserDetailForm onCancel={this.props.onCancel} onChange={this.handleChange} onUpdate={this.handleUpdate} user={this.props.user}/>
      </Modal>
    );
  }

  render() {
    let modal;
    if (this.props.user == null) {
      modal = this._newUserModal()
    } else {
      modal = this._userDetailModal()
    }
    return (
      <div>
        {modal}
      </div>
    );
  }
}

UserForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  lists: PropTypes.array,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  organization : PropTypes.object,
  user : PropTypes.object
}

UserForm.displayName = 'User Form';

export default UserForm
