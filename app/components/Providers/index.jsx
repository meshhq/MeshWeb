
import React, { PropTypes, Component } from 'react'
import ProviderCell from './ProviderCells'
import _ from 'lodash'

class Providers extends Component {
  constructor(props, context) {
    super(props, context)
  }

  _stubbedHipsterLorem() {
    return 'Chillwave vice sriracha hella cliche forage. Thundercats artisan iphone, butcher +1 next level keffiyeh fixie narwhal. Lomo banh mi godard mustache cardigan, ennui truffaut pop-up craft beer. Blog yr 3 wolf moon cred occupy, polaroid shoreditch lomo tattooed. Hella bicycle rights terry richardson, retro semiotics street art wes anderson mcsweeneys beard aesthetic irony kogi occupy. Kogi DIY banksy, photo booth whatever authentic truffaut. Fanny pack high life iphone, ennui shoreditch DIY etsy occupy photo booth farm-to-table mustache hoodie stumptown.'
  }

  _providerWasToggled(providerId, on) {

  }

  render() {
    const providersSections = _.map(this.props.providerState.providers, (provider) => {
      const providerToggled = this._providerWasToggled.bind(this, provider.id)
      return (
        <ProviderCell key={provider.id}
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
      <div className="row provider-wrapper" key="provider">
        {providerRowHTML}
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

export default Providers
