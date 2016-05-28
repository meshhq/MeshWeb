import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

class OrganizationHeader extends Component {
  render() {
    let organization = this.props.organization
    return (
      <Grid fluid>
        <Row>
          <Col md={2}>
            <div className={'initials-bubble'}>
              <p>{organization.name.charAt(0) + organization.name.charAt(1)}</p>
            </div>
          </Col>
          <Col md={10}>
            <h3>{organization.name}</h3>
            <p>{'Website: ' + organization.website}</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

OrganizationHeader.displayName = 'Organization Header';

OrganizationHeader.propTypes = {
  organization: PropTypes.object.isRequired
}

export default OrganizationHeader
