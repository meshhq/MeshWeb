
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
    const panels = _.map(this.props.lists, (list, idx) => {
      return (
        <div className="panel panel-default" 
          key={idx} 
        >
          <div className="panel-heading" 
            id={'heading' + idx}
            role="tab"
          >
            <h4 className="panel-title">
              <a aria-controls={'collapse' + idx}
                aria-expanded="false"
                data-parent="#accordion" 
                data-toggle="collapse" 
                href={'#collapse' + idx}
                role="button"
              >
                {list.name}
              </a>
            </h4>
          </div>
          <div aria-labelledby={'heading' + idx}
            className="panel-collapse collapse in" 
            id={'collapse' + idx}
            role="tabpanel"
          >
            <div className="panel-body">
              {list.description}
            </div>
          </div>
        </div>
        )
    })

    // Layout the providers in a row
    return (
      <div className="row provider-wrapper" 
        key="provider"
      >
        <h1>{'Mesh Lists'}</h1>
        <div className="lists-container">
          {panels}
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
