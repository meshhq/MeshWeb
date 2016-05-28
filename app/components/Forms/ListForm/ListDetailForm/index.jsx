import React, { Component, PropTypes } from 'react'
import { Modal, Grid, Row, Col, Input, Button } from 'react-bootstrap'
import ListHeader from './ListHeader'

class ListDetailForm extends Component {

  _handleChange(key, event) {
    this.props.onChange(key, event)
  }

  _listColumn(key, label, defaultValue) {
    let onChange = this._handleChange.bind(this, key)
    return (
      <Col md={12} ref={key}>
        <Input defaultValue={defaultValue} label={label} onChange={onChange} type="text"/>
      </Col>
    );
  }

  _seperator(title) {
    return (
      <Col className={'seperator'} md={12}>
        <h4>{title}</h4>
        <div className={'seperator-line'}/>
      </Col>
    );
  }

  render() {
    let list = this.props.list
    return (
      <div>
        <Modal.Body>
          <ListHeader list={this.props.list}/>
        </Modal.Body>

        <Modal.Body>
          <Grid fluid>
            <Row>
              {this._listColumn('description', 'Descrition', list.description)}
            </Row>
            <Row>
              {this._seperator('Users')}
            </Row>
          </Grid>
        </Modal.Body>

        <Modal.Footer>
          <Button onClick={this.props.onCancel}>{"Cancel"}</Button>
          <Button bsStyle='success' onClick={this.props.onUpdate}>{"Update"}</Button>
        </Modal.Footer>
      </div>
    );
  }
}

ListDetailForm.displayName = 'List Details';

ListDetailForm.propTypes = {
  list: PropTypes.object.isRequired,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default ListDetailForm
