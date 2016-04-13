
import React, { PropTypes, Component } from 'react'
import ProviderCell from './ProviderCells'
import _ from 'lodash'

class Providers extends Component {
  constructor(props, context) {
    super(props, context)
  }

  _stubbedHipsterLorem() {
    return 'Chillwave vice sriracha hella cliche forage. Thundercats artisan iphone, butcher +1 next level keffiyeh fixie narwhal.'
  }

  _providerWasToggled(providerId, on) {
    // Nada for now
  }

  render() {
    const providersSections = _.map(this.props.providerState.providers, (provider) => {
      const providerToggled = this._providerWasToggled.bind(this, provider.id)
      return (
        <ProviderCell key={provider.id}
          logoSrc={"test"}
          onToggle={providerToggled}
          providerDescription={this._stubbedHipsterLorem()}
          providerName={provider.name}
        />
        )
    })

    // Pack the providers into 3 per row
    const providerRows = []
    const rowCount = (providersSections.length / 3) + 1
    for (let i = 0; i < rowCount; i++) {
      const providerBaseIdx = (i * 3)
      const rowContainer = []
      for (let x = 0; x < 3; x++) {
        const providerIdx = providerBaseIdx + x
        if (providerIdx < providersSections.length) {
          rowContainer.push(providersSections[providerIdx])
        }
      }

      providerRows.push(rowContainer)
    }

    const providerRowHTML = []
    for (let i = 0; i < providerRows.length; i++) {
      const pr = providerRows[i]
      const onToggle = this._providerWasToggled.bind(this, pr.id)
      providerRowHTML.push(
        <div className="row provider-row"
          key={i}
          onToggle={onToggle}
        >
          {pr}
        </div>
      )
    }

    // Layout the providers in a row
    return (
      <div className="provider-wrapper"
        key="provider"
      >
        <div className="integrations-container">
          {providerRowHTML}
        </div>
      </div>
    )
  }
}

// onToggle: PropTypes.func.isRequired,
// providerDescription: PropTypes.string.isRequired,
// providerName: PropTypes.string.isRequired


Providers.defaultProps = {
  providerState: {}
}

Providers.propTypes = {
  providerState: PropTypes.object.isRequired
}

Providers.displayName = 'Providers List'

export default Providers
