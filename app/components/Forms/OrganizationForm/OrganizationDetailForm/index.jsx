import React, { Component, PropTypes } from 'react'
import { Modal, Grid, Row, Col, Input, Button } from 'react-bootstrap'
import OrganizationHeader from './OrganizationHeader'

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
  organization: PropTypes.object.isRequired
}

export default OrganizationDetailForm
