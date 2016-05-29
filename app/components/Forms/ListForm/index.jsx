
import React, { Component, PropTypes } from 'react'
import { Modal } from 'react-bootstrap'
import ListDetailForm from './ListDetailForm'
import NewListForm from './NewListForm'

class ListForm extends Component {
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

  _newListModal() {
    return (
      <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
        <NewListForm onCancel={this.props.onCancel} onChange={this.handleChange} onSave={this.handleSave}/>
      </Modal>
    );
  }

  _listDetailModal() {
    return (
      <Modal onHide={this.handleCloseClick} show={this.props.displayed}>
        <ListDetailForm list={this.props.list} onCancel={this.props.onCancel} onChange={this.handleChange} onUpdate={this.handleUpdate}/>
      </Modal>
    );
  }

  render() {
    let modal;
    if (this.props.list == null) {
      modal = this._newListModal()
    } else {
      modal = this._listDetailModal()
    }
    return (
      <div>
        {modal}
      </div>
    );
  }
}

ListForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  list: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

ListForm.displayName = 'List Form';

export default ListForm
