import React, { Component, PropTypes } from 'react'
import { Grid, Row, Col } from 'react-bootstrap'

class ListHeader extends Component {
  render() {
    let list = this.props.list
    return (
      <Grid fluid>
        <Row>
          <Col md={2}>
            <div className={'initials-bubble'}>
              <p>{list.name.charAt(0) + list.name.charAt(1)}</p>
            </div>
          </Col>
          <Col md={10}>
            <h3>{list.name}</h3>
            <p>{'User Count: ' + list.user_count}</p>
          </Col>
        </Row>
      </Grid>
    );
  }
}

ListHeader.displayName = 'List Header';

ListHeader.propTypes = {
  list: PropTypes.object.isRequired
}

export default ListHeader
