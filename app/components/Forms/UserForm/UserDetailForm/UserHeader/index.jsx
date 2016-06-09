import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

class UserHeader extends Component {
  render() {
    let user = this.props.user
    return (
      <div className="user-detail-header">
        <Row className="header-row">
          <Col md={3} className="initials-bubble-col">
            <div className={'initials-bubble'}>
              <p>{user.first_name.charAt(0) + user.last_name.charAt(0)}</p>
            </div>
          </Col>
          <Col md={9} className="user-details">
            <h3>{user.first_name + ' ' + user.last_name}</h3>
            <p>{user.title}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

UserHeader.displayName = 'User Header';

UserHeader.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserHeader
