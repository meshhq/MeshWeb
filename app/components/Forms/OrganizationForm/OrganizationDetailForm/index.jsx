import React, { Component, PropTypes } from 'react'
import { Modal, Grid, Row, Col, Input, Button } from 'react-bootstrap'
import OrganizationHeader from './OrganizationHeader'
import DataTable from '../../../Shared/DataTable'
import FixedDataTable from 'fixed-data-table'
import TextCell from '../../../Shared/DataTableCells/TextCell'

const { Column, Cell } = FixedDataTable;

class OrganizationDetailForm extends Component {

  _handleChange(key, event) {
    this.props.onChange(key, event)
  }

  _organizationColumn(key, label, defaultValue) {
    let onChange = this._handleChange.bind(this, key)
    return (
      <Col md={6} ref={key}>
        <Input defaultValue={defaultValue} label={label} onChange={onChange} type="text"/>
      </Col>
    );
  }

  _descriptionColumn(key, label, defaultValue) {
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
    let organization = this.props.organization
    return (
      <div>
        <Modal.Body>
          <OrganizationHeader organization={this.props.organization}/>
        </Modal.Body>

        <Modal.Body>
          <Grid fluid>
            <Row>
              {this._organizationColumn('name', 'Organization Name', organization.name)}
              {this._organizationColumn('website', 'Website', organization.website)}
            </Row>
            <Row>
              {this._organizationColumn('size', 'Size', organization.size)}
              {this._organizationColumn('industry', 'Industry', organization.industry)}
            </Row>
            <Row>
              {this._descriptionColumn('description', 'Description', organization.description)}
            </Row>
            <Row>
              {this._seperator('Users')}
              {this._userTable()}
            </Row>
            <Row>
              {this._seperator('Integration Data')}
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

OrganizationDetailForm.displayName = 'Organization Details';

OrganizationDetailForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  users: PropTypes.array.isRequired
}

export default OrganizationDetailForm
