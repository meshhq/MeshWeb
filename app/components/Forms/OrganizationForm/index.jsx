
import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import OrganizationDetailForm from './OrganizationDetailForm'
import NewOrganizationForm from './NewOrganizationForm'

class OrganizationForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this._handleChange.bind(this)
    this.handleSave = this._handleSave.bind(this)
    this.handleUpdate = this._handleUpdate.bind(this)
  }

  _handleChange(stateKey, e) {
    let state = this.state
    state[stateKey] = e.target.value;
    this.setState( state )
  }

  _handleSave() {
    this.props.onSave(this.state)
  }

  _handleUpdate() {
    this.props.onUpdate(this.state)
  }

  _newOrganizationModal() {
    return (
      <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
        <NewOrganizationForm onCancel={this.props.onCancel} onChange={this.handleChange} onSave={this.handleSave}/>
      </Modal>
    );
  }

  _organizationDetailModal() {
    return (
      <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
        <OrganizationDetailForm onCancel={this.props.onCancel} onChange={this.handleChange} onUpdate={this.handleUpdate} organization={this.props.organization}/>
      </Modal>
    );
  }

  render() {
    let modal;
    if (this.props.organization == null) {
      modal = this._newOrganizationModal()
    } else {
      modal = this._organizationDetailModal()
    }
    return (
      <div>
        {modal}
      </div>
    );
  }
}

OrganizationForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  organization: PropTypes.object
}

OrganizationForm.displayName = 'Organization Form';

export default OrganizationForm
