
import React, { PropTypes } from 'react'
import { Col, Button } from 'react-bootstrap'

const ProviderCell = ({ providerID, onActivateClick, providerName, logoSrc }) => {
  let handleActivateClick = onActivateClick.bind(this, providerID)
  return (
    <Col className={'provider-cell'} md={3}>
      <img className="logo-img" src={logoSrc}/>
      <h4>{providerName}</h4>
      <Button bsStyle='success' onClick={handleActivateClick}>{"Activate"}</Button>
    </Col>
  );
}

ProviderCell.displayName = 'Provider Cell'

ProviderCell.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  onActivateClick: PropTypes.func.isRequired,
  providerName: PropTypes.string.isRequired
}

export default ProviderCell
