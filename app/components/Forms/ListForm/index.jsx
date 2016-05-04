
import React, { Component, PropTypes } from 'react'
import { Button, Modal, Input } from 'react-bootstrap'

class ListForm extends Component {
  constructor(props) {
    super(props);
    this.state = {};
    this.handleChange = this._handleChange.bind(this)
    this.handleSave = this._handleSave.bind(this)
  }

  _handleChange(stateKey, e) {
    let state = this.state
    state[stateKey] = e.target.value;
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
            <Modal.Title>{"New List"}</Modal.Title>
          </Modal.Header>


          <Modal.Body>
            <Input placeholder="List Name" type="text" onChange={this._handleChange.bind(this, 'name')}/>
            <Input placeholder="Description"type="text" onChange={this._handleChange.bind(this, 'description')}/>
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

ListForm.propTypes = {
  displayed: PropTypes.bool.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired
}

ListForm.displayName = 'List Form';

export default ListForm
