
import React, { Component, PropTypes } from 'react'

class Organizations extends Component {
  constructor(props, context) {
    super(props, context)
            
  }

  render() {

    const { organizations } = this.props
    console.log(organizations)
    return (
      <div className="organizations-container">
        
        <div className="header row">
          <div className="col-md-12">
            <h1>{'Organizations'}</h1>
            <h4>{'Organizations that your users belong to'}</h4>
          </div>
        </div>

        <div className="organizations-table">
          <div className="row table-wrapper">
            <div className="col-md-12 userTableWrapper">
              <table>
                <thead>
                  <tr>
                    <th>{'Header content 1'}</th>
                    <th>{'Header content 2'}</th>
                  </tr>
                </thead>
                <tfoot>
                  <tr>
                    <td>{'Footer content 1'}</td>
                    <td>{'Footer content 2'}</td>
                  </tr>
                </tfoot>
                <tbody>
                  <tr>
                    <td>{'Body content 1'}</td>
                    <td>{'Body content 2'}</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </div>
    )
  }
}

Organizations.propTypes = {
  organizations: PropTypes.arrayOf(React.PropTypes.object).isRequired
}

export default Organizations