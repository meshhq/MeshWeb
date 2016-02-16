
import React, { PropTypes } from 'react'
import Switch from 'react-bootstrap-switch'
import 'react-bootstrap-switch/dist/css/bootstrap3/react-bootstrap-switch.css'

const ProviderCell = ({ onToggle, providerName, providerDescription }) => {
  return (
      <div className="col-md-4 providerCell">
        <div className="row title-row provider-row">
          <div className="col-xs-8">
            <h3>{providerName}</h3>
          </div>
          <div className="col-xs-4 switch-container">
            <Switch className="provider-switch" state={false} size="small"/>
          </div>
        </div>
        <div className="row provider-row">
          <div className="col-xs-12">
            <p>{providerDescription}</p>
          </div>
        </div>
      </div>
    )
}

ProviderCell.displayName = 'Provider Cell'

ProviderCell.propTypes = {
  onToggle: PropTypes.func.isRequired,
  providerDescription: PropTypes.string.isRequired,
  providerName: PropTypes.string.isRequired
}

export default ProviderCell
