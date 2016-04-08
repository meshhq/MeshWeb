
import React, { PropTypes, Component } from 'react'
import _ from 'underscore'

/**
 * Lists represent the user lists for a application
 */
class Lists extends Component {
  constructor(props, context) {
    super(props, context)
    const providerTypesPresentInLists = _.pluck(this.props.lists, 'origin_provider')
    const uniqProviderTypesPresentInLists = _.uniq(providerTypesPresentInLists)
    const filteredProviders = _.filter(this.props.providers, (provider) => { 
      return _.indexOf(uniqProviderTypesPresentInLists, provider.type) != -1
    })
    filteredProviders.push(this._meshProvider())
    this.state = { filteredProviders: filteredProviders, selectedProvider: _.last(filteredProviders) }
  }

  _listsFilteredByCurrentIntegration() {
    const lists = this.props.lists;
    return _.filter(lists, (list) => { list.integraitonId === this.state.selectedIntegration.id })
  }

  _providerSelected(provider) {
    this.setState({ selectedProvider: provider })
  }

  /**
   * Synthetic provider injected into the provider selection list
   */
  _meshProvider() {
    return {
      name: 'Mesh',
      type: 0
    }
  }

  render() {
    // MAKE PANELS
    const providersForDropdown = _.filter(this.state.filteredProviders, (provider) => { 
      return provider.type != this.state.selectedProvider.type
    })
    
    // Building the drop down top left sort
    let providerSortList = []
    for (let i = 0; i < providersForDropdown.length; i++) {
      const provider = providersForDropdown[i]
      const providerClicked = this._providerSelected.bind(this, provider)
      providerSortList.push(
        <li>
          <a href="#"
            key={provider.name}
            onClick={providerClicked} 
          >
          {provider.name}
          </a>
        </li>
      )      
    }

    // Building the drop down top left sort
    const filteredLists = _.filter(this.props.lists, (list) => { 
      const hasName = list.hasOwnProperty('name')
      const isCurrentProvider = list.origin_provider == this.state.selectedProvider.type
      return hasName && isCurrentProvider
    })

    const panels = _.map(filteredLists, (list) => {



      return (
        <div className="list row" 
          key={list.id}
        >
          <div className="col-md-4 name-column">
            {list.name}
          </div>
          <div className="col-md-4 user-column">
            {'100 Users'}
          </div>
          <div className="col-md-4 action-column">
            <div className="action-selector">
              <div className="btn-group">
                <button 
                  className="btn" 
                  type="button" 
                >
                {'Send To Provider'}
                </button>
                <button aria-expanded="false" 
                  aria-haspopup="true" 
                  className="btn dropdown-toggle" 
                  data-toggle="dropdown" 
                  type="button" 
                >
                  <span className="caret"></span>
                  <span className="sr-only">{'Toggle Dropdown'}</span>
                </button>
                <ul className="dropdown-menu">
                  <li><a href="#">{'Action'}</a></li>
                  <li><a href="#">{'Another action'}</a></li>
                  <li><a href="#">{'Something else here'}</a></li>
                  <li className="divider" 
                    role="separator"
                  >
                  </li>
                  <li><a href="#">{'Separated link'}</a></li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        )
    })

    // Layout the providers in a row
    return (
      <div className="row list-wrapper" 
        key="list"
      >
        <div className="header row">
          <div className="col-md-12">
            <h1>{'Mesh Lists'}</h1>
            <h4>{'Lists are derrived from your integrations.'}</h4>
          </div>
        </div>
        <div className="col-md-12 integration-selector">
          <div className="company-selector">
            <div className="btn-group integration-selector">
              <button 
                className="btn integration-selector" 
                type="button"
              >{this.state.selectedProvider.name}</button>
              <button 
                aria-expanded="false" 
                aria-haspopup="true"
                className="btn integration-selector dropdown-toggle" 
                data-toggle="dropdown" 
                type="button"
              >
                <span className="caret"></span>
                <span className="sr-only">{'Toggle Dropdown'}</span>
              </button>
              <ul className="dropdown-menu">
                {providerSortList}
              </ul>
            </div>
          </div>
        </div>
        <div className="list-content row">
          <div className="header-block row">
            <div className="col-md-4 list-header">
              <div className="header-container">
                <h3>{'Name'}</h3>
              </div>
            </div>
            <div className="col-md-4 list-header">
              <div className="header-container">
                <h3>{'Number of Users'}</h3>
              </div>
            </div>
            <div className="col-md-4 list-header">
              <div className="header-container">
                <h3>{'Actions'}</h3>
              </div>
            </div>
          </div>
          
          <div className="content-rows row">
            {panels}
          </div>
        </div>
      </div>
    )
  }
}

Lists.defaultProps = {
  currentCompany: '',
  lists: []
}

Lists.propTypes = {
  lists: PropTypes.array.isRequired,
  providers: PropTypes.array.isRequired
}

// Display Name
Lists.displayName = 'Lists'

export default Lists
