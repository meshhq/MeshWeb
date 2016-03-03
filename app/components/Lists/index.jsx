
import React, { PropTypes, Component } from 'react'
import _ from 'lodash'

/**
 * Lists represent the user lists for a application
 */
class Lists extends Component {
  constructor(props, context) {
    super(props, context)
  }

  render() {

    // MAKE PANELS
    const filteredLists = _.filter(this.props.lists, (list) => { return list.hasOwnProperty('name') })
    const panels = _.map(filteredLists, (list, idx) => {
      console.log(list)

      return (
        <div className="list row">
          <div className="col-md-4 name-column">
            {list.name}
          </div>
          <div className="col-md-4 user-column">
            {'100 Users'}
          </div>
          <div className="col-md-4 action-column">
            <div className="action-selector">
              <div className="btn-group">
                <button type="button" className="btn">Select An Action</button>
                <button type="button" className="btn dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="caret"></span>
                  <span className="sr-only">Toggle Dropdown</span>
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
          <div className="col-md-12">
            <div className="company-selector">
              <div className="btn-group integration-selector">
                <button type="button" className="btn integration-selector">Select An Integration</button>
                <button type="button" className="btn integration-selector dropdown-toggle" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  <span className="caret"></span>
                  <span className="sr-only">Toggle Dropdown</span>
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

// onToggle: PropTypes.func.isRequired,
// providerDescription: PropTypes.string.isRequired,
// providerName: PropTypes.string.isRequired


Lists.defaultProps = {
  lists: []
}

Lists.propTypes = {
  lists: PropTypes.array.isRequired
}

export default Lists
