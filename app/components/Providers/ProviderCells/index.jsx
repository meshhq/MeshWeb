
import React, { PropTypes } from 'react'
import { Col, Button } from 'react-bootstrap'

// Components
import LoadingText from '../../../components/Shared/LoadingText'

// Assets
import logo from '../../../assets/images/mesh_logo.png'

const ProviderCell = ({ activeIntegration, providerID, onActivateClick, providerName, logoSrc }) => {
  let handleActivateClick = onActivateClick.bind(this, providerID)

  // If mesh, use the local logo asset
  const imgSrc = providerName.toLowerCase() === 'mesh' ? logo : logoSrc
  const activeClass = activeIntegration ? ' active' : ''
  const btnText = activeIntegration ? 'Activated' : 'Activate'
  const clickHandler = activeIntegration ? null : handleActivateClick


  return (
    <Col className={'provider-cell' + activeClass} md={3}>
      <div className={'provider-container' + activeClass}>
        <div className={'image-wrapper' + activeClass}>
          <img className={'logo img-responsive' + activeClass} src={imgSrc}/>
        </div>
        <h4>{providerName}</h4>
        <LoadingText loadText={'Syncing'} />
        <Button bsStyle={'success'} className={'activate-btn' + activeClass} onClick={clickHandler}>{btnText}</Button>
      </div>
    </Col>
  );
}

ProviderCell.displayName = 'Provider Cell'

ProviderCell.defaultParams = {
  activeIntegration: false
}

ProviderCell.propTypes = {
  activeIntegration: PropTypes.bool.isRequired,
  color: PropTypes.string.isRequired,
  logoSrc: PropTypes.string.isRequired,
  onActivateClick: PropTypes.func.isRequired,
  providerName: PropTypes.string.isRequired
}

export default ProviderCell
