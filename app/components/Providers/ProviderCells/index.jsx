
import React, { PropTypes } from 'react'
import { Col, Button } from 'react-bootstrap'

// Assets
import logo from '../../../assets/images/mesh_logo.png'

const ProviderCell = ({ providerID, onActivateClick, providerName, logoSrc }) => {
  let handleActivateClick = onActivateClick.bind(this, providerID)

  // If mesh, use the local logo asset
  const imgSrc = providerName.toLowerCase() === 'mesh' ? logo : logoSrc

  return (
    <Col className={'provider-cell'} md={3}>
      <img className="logo-img img-responsive" src={imgSrc}/>
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
