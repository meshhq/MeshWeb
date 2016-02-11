
import React, { PropTypes } from 'react'

const ProviderCell = ({ onToggle, providerName, providerDescription }) => (
		<div className="col-md-1 providerCell"> 
			{providerName}<br />

		</div>
	)

ProviderCell.displayName = 'Provider Cell'

ProviderCell.propTypes = {
  onToggle: PropTypes.func.isRequired,
  providerDescription: PropTypes.string.isRequired,
  providerName: PropTypes.string.isRequired
}

export default ProviderCell