import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

class UserHeader extends Component {
  render() {
    let user = this.props.user
    return (
      <Grid fluid className={'user-header'}>
        <Row>
          <Col md={2}>
            <div className={'initials-bubble'}>
              <p>{user.first_name.charAt(0) + user.last_name.charAt(0)}</p>
            </div>
          </Col>
          <Col md={10}>
            <h3>{user.first_name + ' ' + user.last_name}</h3>
            <p>{'Title: ' + user.title}</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

UserHeader.displayName = 'User Header';

UserHeader.propTypes = {
  user: PropTypes.object.isRequired
}

export default UserHeader
