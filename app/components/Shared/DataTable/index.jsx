import React, { Component, PropTypes } from 'react'
import { Modal, Grid, Row, Col, Input, Button } from 'react-bootstrap'
import ListHeader from './ListHeader'

class DataTable extends Component {

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
      <Table headerHeight={40} height={800} rowHeight={35} rowsCount={filteredDataList.getSize()} width={this.props.width} {...this.props}>

      </Table>
    );
  }
}

ListDetailForm.displayName = 'List Details';

ListDetailForm.propTypes = {
  headerHeight: PropTypes.object.isRequired,
  tableHeight: PropTypes.func.isRequired,
  rowHeight: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired
}

export default ListDetailForm
