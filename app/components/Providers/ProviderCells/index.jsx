
import React, { PropTypes } from 'react'
import Switch from 'react-bootstrap-switch'
import 'react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.css'

const ProviderCell = ({ onToggle, providerName, providerDescription, logoSrc }) => {
  return (
    <div className="col-md-4 provider-cell">
      <div className="row title-row provider-row">
        <div className="col-xs-8">
          <h3>{providerName}</h3>
        </div>
        <div className="col-xs-4 switch-container">
          <Switch className="provider-switch"
            onChange={onToggle}
            size="small"
            state={false}
          />
        </div>
      </div>
      <div className="row provider-row">
        <div className="col-xs-2 logo">
          <img className="logo-img"
            src={logoSrc}
          />
        </div>
        <div className="mini-border">
        </div>
        <div className="col-xs-10 description">
          <p>{providerDescription}</p>
        </div>
      </div>
    </div>
    )
}

ProviderCell.displayName = 'Provider Cell'

ProviderCell.propTypes = {
  logoSrc: PropTypes.string.isRequired,
  onToggle: PropTypes.func.isRequired,
  providerDescription: PropTypes.string.isRequired,
  providerName: PropTypes.string.isRequired
}

export default ProviderCell
