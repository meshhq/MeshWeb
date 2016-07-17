
import React, { PropTypes } from 'react'
import { Col, Button } from 'react-bootstrap'
import { OverlayTrigger, Tooltip } from 'react-bootstrap'

// Components
import LoadingText from '../../../components/Shared/LoadingText'

// Helpers
import { integrationStateDescription, integrationIsSyncing } from '../../../constants/integrationSyncStatus'

// Tracking 
import { trackClickedInfoOnInactiveProvider } from '../../../helpers/tracking'

// Assets
import logo from '../../../assets/images/mesh_logo.png'

const ProviderCell = ({ integration, providerID, onActivateClick, providerName, live, logoSrc }) => {
  let handleActivateClick = onActivateClick.bind(this, providerID)

  // Integration is active if we have a integration passed in
  const activeIntegration = integration ? true : false

  // If mesh, use the local logo asset
  const imgSrc = providerName.toLowerCase() === 'mesh' ? logo : logoSrc
  const activeClass = activeIntegration ? ' active' : ''
  const btnText = activeIntegration ? 'Activated' : 'Activate'

  // Action content is the action available to take on the provider
  const clickHandler = activeIntegration ? handleActivateClick : handleActivateClick

  // Info (Not Live) Handler
  const notLiveProviderClickHandler = () => {
    trackClickedInfoOnInactiveProvider({ name: providerName })
  }

  // Action content is the cell actionable content (button / sync status)
  let actionContent
  if (live) {
    actionContent = (
      <Button className={'activate-btn' + activeClass} onClick={clickHandler}>{btnText}</Button>
    ) 
  } else {
    const tooltip = (
      <Tooltip id={providerID}>
        <strong>{'Coming Soon'}</strong><br></br>
        {'We\'re actively working on this integraiton. Find out more by contacting us at:'}<br></br>
        <strong>{'info@meshdata.io'}</strong>
      </Tooltip>
    )
    actionContent = (
      <OverlayTrigger key={providerID} overlay={tooltip} placement="bottom" >
        <Button className={'activate-btn not-live'} onClick={notLiveProviderClickHandler}>{'Info'}</Button>
      </OverlayTrigger>
    )
  }

  // Demo Override
  if (process.env.MODE === 'demo') {
    const tooltip = (
      <Tooltip id={providerID}><strong>{'Demo Mode'}</strong><br></br>{'Sign up for Mesh at https://app.meshdata.io to activate integrations'}</Tooltip>
    )
    actionContent = (
      <OverlayTrigger key={providerID} overlay={tooltip} placement="bottom" >
        {actionContent}
      </OverlayTrigger>
    )
  }
  
  // Replace action if the integration is actively syncing
  let integrationStatus = null
  if (integration) {
    const syncing = integrationIsSyncing(integration.state)
    const syncDesc = integrationStateDescription(integration.state)
    if (activeIntegration && syncing) {
      integrationStatus = (
        <LoadingText loadText={'Syncing'} />  
      )
      actionContent = null
    } else if (activeIntegration && syncDesc != 'Synced') {
      integrationStatus = (
        <p className='integration-status'>{syncDesc}</p>
      )
    }    
  }

  // If there's an integration status, only show one
  if (integrationStatus) {
    actionContent = null
  }

  return (
    <Col className={'provider-cell' + activeClass} xs={12}>
      <div className={'provider-container' + activeClass}>
        <div className={'image-wrapper' + activeClass}>
          <img className={'logo img-responsive' + activeClass} src={imgSrc}/>
        </div>
        <h4>{providerName}</h4>
        {integrationStatus}
        {actionContent}
      </div>
    </Col>
  );
}

ProviderCell.displayName = 'Provider Cell'

ProviderCell.defaultParams = {
  activeIntegration: false
}

ProviderCell.propTypes = {
  color: PropTypes.string.isRequired,
  integration: PropTypes.object,
  logoSrc: PropTypes.string.isRequired,
  onActivateClick: PropTypes.func.isRequired,
  providerName: PropTypes.string.isRequired
}

export default ProviderCell
