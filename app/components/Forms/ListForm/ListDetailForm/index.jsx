import React, { Component, PropTypes } from 'react'
import { Modal, Grid, Row, Col, Input, Button } from 'react-bootstrap'
import ListHeader from './ListHeader'
import DataTable from '../../../Shared/DataTable'
import FixedDataTable from 'fixed-data-table'
import TextCell from '../../../Shared/DataTableCells/TextCell'

const { Column, Cell } = FixedDataTable;

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

  _onUserClick() {

  }

  _userTable() {
    let columns = []
    if (this.props.users == null) {
      return columns
    }

    let handleUserClick = this._onUserClick.bind(this)
    let firstNameCall = (<TextCell col="first_name" data={this.props.users} onClick={handleUserClick}/>)
    columns.push(<Column cell={firstNameCall} header={<Cell>{'First Name'}</Cell>} key={'first_name'} width={150}/>)

    let lastNameCell = (<TextCell col="last_name" data={this.props.users} onClick={handleUserClick}/>)
    columns.push(<Column cell={lastNameCell} header={<Cell>{'Last Name'}</Cell>} key={'last_name'} width={150}/>)

    let emailCell = (<TextCell col="email" data={this.props.users} onClick={handleUserClick}/>)
    columns.push(<Column cell={emailCell} header={<Cell>{'Email'}</Cell>} key={'email'} width={240}/>)

    return (
      <Col md={12}>
        <DataTable
          columns={columns}
          maxHeight={300}
          rowCount={this.props.users.getSize()}
          width={540}
          {...this.props}
        />
      </Col>
    )
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
              {this._userTable()}
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
  onUpdate: PropTypes.func.isRequired,
  users: PropTypes.object
}

export default ListDetailForm
