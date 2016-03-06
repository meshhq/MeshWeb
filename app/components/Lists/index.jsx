
import React, { PropTypes, Component } from 'react'
import _ from 'underscore'

/**
 * Lists represent the user lists for a application
 */
class Lists extends Component {
  constructor(props, context) {
    super(props, context)
    const providerIdsPresentInLists = _.pluck(this.props.providers, 'id')
    const uniqProviderIdsPresentInLists = _.uniq(providerIdsPresentInLists)
    const filteredProviders = _.filter(this.props.providers, (provider) => { 
      return _.indexOf(uniqProviderIdsPresentInLists, provider.id) != -1
    })
    this.state = { filteredProviders: filteredProviders, selectedProvider: filteredProviders[0] }
  }

  _listsFilteredByCurrentIntegration() {
    const lists = this.props.lists;
    return _.filter(lists, (list) => { list.integraitonId === this.state.selectedIntegration.id })
  }

  _providerSelected(provider) {
    this.setState({ selectedProvider: provider })
  }

  render() {

    // MAKE PANELS
    const providersForDropdown = _.filter(this.state.filteredProviders, (provider) => { 
      return provider.id != this.state.selectedProvider.id
    })

    // Building the drop down top left sort
    let providerSortList = []
    for (let i = 0; i < providersForDropdown.length; i++) {
      const provider = providersForDropdown[i]
      const companyClicked = this._providerSelected.bind(this, provider)
      providerSortList.push(
        <li>
          <a href="#"
            key={provider.name}
            onClick={companyClicked} 
          >
          {provider.name}
          </a>
        </li>
      )      
    }

    // Building the drop down top left sort
    const filteredLists = _.filter(this.props.lists, (list) => { 
      const hasName = list.hasOwnProperty('name')
      const isCurrentProvider = list.origin_provdier == this.state.selectedProvider.id
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
                  <li><a href="#">Action</a></li>
                  <li><a href="#">Another action</a></li>
                  <li><a href="#">Something else here</a></li>
                  <li role="separator" className="divider"></li>
                  <li><a href="#">Separated link</a></li>
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
              <button type="button" className="btn integration-selector">{this.state.selectedProvider.name}</button>
              <button type="button" className="btn integration-selector dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                <span className="caret"></span>
                <span className="sr-only">Toggle Dropdown</span>
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

export default Lists
