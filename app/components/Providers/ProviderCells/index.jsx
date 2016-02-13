
import React, { PropTypes } from 'react'
import Switch from 'react-bootstrap-switch'

const ProviderCell = ({ onToggle, providerName, providerDescription }) => {
  return (
      <div className="col-md-4 providerCell">
        {providerName}<br />
        {providerDescription}<br />
        <Switch />
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
