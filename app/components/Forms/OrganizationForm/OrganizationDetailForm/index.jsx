
import React, { Component, PropTypes } from 'react'
import { Modal, Button } from 'react-bootstrap'
import OrganizationHeader from './OrganizationHeader'
import _ from 'underscore'

class OrganizationDetailForm extends Component {
  displayName: 'Organization Details';
  constructor(props, context) {
    super(props, context);

    // Binding methods
    this.contentForInfo = this._contentForInfo.bind(this)
    this.providerForTypeID = this._providerForTypeID.bind(this)
    this.usersTableWithUsers = this._usersTableWithUsers.bind(this)
    this.onSelectedUser = this._onSelectedUser.bind(this)
  }

  _contentForInfo(label, value, full = false, contentId = '') {
    if (value) {
      // Need to format and perform checks based on type
      let formattedValue = null

      // String check
      if (_.isString(value) && value.length > 0) {
        formattedValue = value
      }

      // Number check
      if (_.isNumber(value)) {
        formattedValue = value.toLocaleString()
      }

      // If theres a value, return html
      if (formattedValue) {
        return (
          <div className={(full ? 'col-xs-12' : 'col-xs-6') + ' info-field'} key={formattedValue + contentId}>
            <dt>{label}</dt>
            <dd>{formattedValue}</dd>
          </div>
        )
      }
    }
  }

  _providerForTypeID(typeID) {
    return _.find(this.props.providers, (provider) => {
      if (provider.type === typeID) {
        return provider
      }
    })
  }

  _onSelectedUser(user) {
    this.props.onSelectOrgUser(user)
  }

  _usersTableWithUsers(users) {
    const headers = (
      <tr>
        <th>{'email'}</th>
        <th>{'first name'}</th>
        <th>{'last name'}</th>
      </tr>
    )

    const rows = _.map(users, (user, idx) => {
      const boundSelectUser = this.onSelectedUser.bind(this, user)
      return (        
        <tr className='person-row' key={idx} onClick={boundSelectUser}>
          <th scope='row'>{user.email}</th>
          <td>{user.first_name}</td>
          <td>{user.last_name}</td>
        </tr>
    )
    })

    return (
      <table className='table table-hover'>
        <thead>
          {headers}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  render() {
    const { organization } = this.props

    /**
     * Conditional Footer
     */
    let footer = null
    if (this.props.displayActionButtons) {
      footer = (
        <Modal.Footer>
          <Button onClick={this.props.onCancel}>{"Cancel"}</Button>
          <Button bsStyle='success' onClick={this.props.onUpdate}>{"Update"}</Button>
        </Modal.Footer>
      )
    }

    /**
     * Organization
     */

    // Find provider if given
    const provider = this.providerForTypeID(organization.origin_provider)
    let providerContent = null
    if (provider) {
      providerContent = this.contentForInfo('integration', provider.name, true)
    }

    const orgSection = (
      <div className="row organization">
        <div className="col-xs-12">
          <dl className="dl-horizontal">
            {this.contentForInfo('name', organization.name, true)}
            {this.contentForInfo('industry', organization.industry, true)}
            {this.contentForInfo('description', organization.description, true)}
            {this.contentForInfo('annual rev', organization.annual_revenue, true)}
            {this.contentForInfo('head count', organization.size, true)}
            {this.contentForInfo('mesh users', organization.user_count)}
            {this.contentForInfo('website', organization.website, true)}
            {providerContent}
          </dl>
        </div>
      </div>  
    )

    let usersTable = null
    if (this.props.users) {
      const table = this.usersTableWithUsers(this.props.users)
      usersTable = (
        <div className="row lists">
          <div className="col-xs-12">
            <h4>{'Users In ' + this.props.organization.name}</h4>
          </div>
          <div className="col-xs-12">
            <dl className="dl-horizontal">
              {table}
            </dl>
          </div>
        </div>
      )
    }

    return (
      <div className="org-detail-form">
        <div>
          <OrganizationHeader organization={organization}/>
        </div>

        <div className="org-content">
          
          {orgSection}
                      
          {usersTable}

        </div>
        {footer}
      </div>
    );
  }
}

OrganizationDetailForm.defaultProps = {
  displayActionButtons: true
}

OrganizationDetailForm.propTypes = {
  displayActionButtons: PropTypes.bool,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onSelectOrgUser: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  organization: PropTypes.object.isRequired,
  providers: PropTypes.array.isRequired,
  users: PropTypes.array.isRequired
}

export default OrganizationDetailForm
