import React, { Component, PropTypes } from 'react'
import { Row, Col } from 'react-bootstrap'

class OrganizationHeader extends Component {
  render() {
    let organization = this.props.organization
    return (
      <div className="org-detail-header">
        <Row className="header-row">
          <Col className="initials-bubble-col" md={3} >
            <div className={'initials-bubble'}>
              <p>{organization.name.charAt(0) + organization.name.charAt(1)}</p>
            </div>
          </Col>
          <Col className="org-details" md={9} >
            <h3>{organization.name}</h3>
            <p>{'Website: ' + organization.website}</p>
          </Col>
        </Row>
      </div>
    );
  }
}

OrganizationHeader.displayName = 'Organization Header';

OrganizationHeader.propTypes = {
  organization: PropTypes.object.isRequired
}

export default OrganizationHeader