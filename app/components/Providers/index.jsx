
import React, { PropTypes, Component } from 'react'
import ProviderCell from './ProviderCells'

class Providers extends Component {
	displayName: "Main Providers Component";
	constructor(props, context) {
		super(props)
	}

	render() {

		let providersSections = _.map(this.props.providers, (provider) => {
			return <ProviderCell provider={provider}/>
		})

		// Pack the providers into 3 per row
		let providerRows = []
		let rowCount = (providersSections.length / 3) + 1
		for (let i = 0; i < rowCount; i++) {
			let providerBaseIdx = (i * 3)
			let rowContainer = []
			for (let x = 0; x < 3; x++) {
				let providerIdx = providerBaseIdx + x
				if (providerIdx > providersSections.length) {
					rowContainer.push(providersSections[providerIdx])
				}
			}
			providerRows.push(rowContainer)
		}

		// Layout the providers in a row
		

		return (
			{	providerRows }
		)
	}
}

Providers.defaultProps = {
  providers: []
}

Providers.propTypes = {
  providers: PropTypes.arrayOf(React.PropTypes.object).isRequired
}

export default Providers