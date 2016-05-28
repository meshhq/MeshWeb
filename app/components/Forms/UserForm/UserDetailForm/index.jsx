import React, { Component, PropTypes } from 'react'
import { Modal, Grid, Row, Col, Input, Button } from 'react-bootstrap'
import UserHeader from './UserHeader'

class UserDetailForm extends Component {

  _handleChange(key, event) {
    this.props.onChange(key, event)
  }

  _userColumn(key, label, defaultValue) {
    let onChange = this._handleChange.bind(this, key)
    return (
      <Col md={6} ref={key}>
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
    let user = this.props.user
    return (
      <div>
        <Modal.Body>
          <UserHeader user={this.props.user}/>
        </Modal.Body>

        <Modal.Body>
          <Grid fluid>
            <Row>
              {this._userColumn('first_name', 'First Name', user.first_name)}
              {this._userColumn('last_name', 'Last Name', user.last_name)}
            </Row>
            <Row>
              {this._userColumn('email', 'Email', user.email)}
              {this._userColumn('phone', 'Phone', user.phone)}
            </Row>
            <Row>
              {this._seperator('Organization')}
            </Row>
            <Row>
              {this._userColumn('organization_name', 'Organization', user.organization_name)}
              {this._userColumn('website', 'Website', user.website)}
            </Row>
            <Row>
              {this._seperator('Lists')}
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

UserDetailForm.displayName = 'User Details';

UserDetailForm.propTypes = {
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default UserDetailForm
