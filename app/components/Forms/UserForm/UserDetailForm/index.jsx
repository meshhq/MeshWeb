
import React, { Component, PropTypes } from 'react'
import { Modal, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import UserHeader from './UserHeader'
import _ from 'underscore'
import Pill from '../../../Shared/Pill'
import Validator from 'validator'


class UserDetailForm extends Component {
  displayName: 'User Details';
  constructor(props, context) {
    super(props, context);

    // Binding methods
    this.contentForInfo = this._contentForInfo.bind(this)
    this.contentForLists = this._contentForLists.bind(this)
    this.contentForSupportTickets = this._contentForSupportTickets.bind(this)
    this.contentForTransactions = this._contentForTransactions.bind(this)
    this.linkClicked = this._linkClicked.bind(this)
    this.transactionsTableWithTransactions = this._transactionsTableWithTransactions.bind(this)
    this.providerPillsForProviderKey = this._providerPillsForProviderKey.bind(this)
    this.supportTicketsTableWithTickets = this._supportTicketsTableWithTickets.bind(this)
  }

  // Main formatter for label/value
  _contentForInfo(label, value, full = false, contentId = '') {
    if (value) {
      // Need to format and perform checks based on type
      let formattedValue = null

      // String check
      if (_.isString(value) && value.length > 0) {

        // Look for email or site labels
        if (Validator.isEmail(value)) {
          formattedValue = (
            <a href={'mailto:' + value}>{value}</a>
          )
        } else if (label === 'email') {
          formattedValue = (
            <a href="#" onClick={this.linkClicked}>{value}</a>
          )
        } else if (Validator.isURL(value)) {
          formattedValue = (
            <a href={'http://www.' + value} target='_blank'>{value}</a>
          )
        } else {
          formattedValue = value
        }

      }

      // Number check
      if (_.isNumber(value)) {
        formattedValue = value.toLocaleString()
      }

      // Object
      if (value && !formattedValue) {
        formattedValue = value
      }

      // If theres a value, return html
      if (formattedValue) {
        return (
          <div className={(full ? 'col-xs-12' : 'col-xs-6') + ' info-field'} key={label + contentId + label}>
            <dt>{label}</dt>
            <dd>{formattedValue}</dd>
          </div>
        )
      }
    }
  }

  _linkClicked(e) {
    e.preventDefault()
  }

  _contentForLists(lists) {
    let listsContent = []
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i]

      const tooltip = (
        <Tooltip id={list.id}><strong>{'List Link'}</strong><br></br>{' This links out to the user list that resides in the integration.'}</Tooltip>
      )

      const provider = this.providerForTypeID(list.origin_provider)
      listsContent.push(
        <OverlayTrigger key={list.id} overlay={tooltip} placement="top" >
          <a href="#" onClick={this.linkClicked} target='_blank'>
            {this.contentForInfo('title', list.name, list.id)}
          </a>
        </OverlayTrigger>
      )
      listsContent.push(this.contentForInfo('User Count', list.user_count, list.id))
      listsContent.push(this.contentForInfo('Description', list.description, true, list.id))
      listsContent.push(this.contentForInfo('Integration', provider.name, true, list.id))
    }
    return listsContent
  }

  _contentForSupportTickets(threads) {
    return this.supportTicketsTableWithTickets(threads)
  }

  _supportTicketsTableWithTickets(threads) {
    // Standard Tooltip
    const headers = (
      <tr>
        <th>{'Date'}</th>
        <th>{'Origin'}</th>
        <th>{'Number'}</th>
        <th>{'Subject'}</th>
      </tr>
    )

    const rows = _.map(threads, (thread, idx) => {
      const createdDate = new Date(thread.created_at)
      const integraitonKey = _.keys(thread.integration_data)[0]
      const integrationLink = thread.integration_data[integraitonKey].url
      const createdShortDate = createdDate.getMonth() + '/' + createdDate.getDay() + '/' + createdDate.getFullYear()
      return (
        <tr className='thread-row' key={idx}>
          <td className='td-first' scope='row'>{createdShortDate}</td>
          <td className='td-second' scope='pill-row'>{this.providerPillsForProviderKey(thread.integration_data)}</td>
          <td className='td-third'>
            <a href={'http://' + integrationLink} target='_blank'>
              <p>{'300'}</p>
            </a>
          </td>
          <td className='td-forth'>{thread.description}</td>
        </tr>
      )
    })

    return (
      <table className='table'>
        <thead>
          {headers}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  _contentForTransactions(transactions) {
    return this.transactionsTableWithTransactions(transactions)
  }

  _transactionsTableWithTransactions(transactions) {
    // Standard Tooltip
    const headers = (
      <tr>
        <th className='td-first'>{'Date'}</th>
        <th className='td-second'>{'Origin'}</th>
        <th className='td-third'>{'Amount'}</th>
        <th className='td-forth'>{'Description'}</th>
      </tr>
    )

    const rows = _.map(transactions, (transaction, idx) => {

      // Date
      const createdDate = new Date(transaction.created_at)
      const createdShortDate = createdDate.getMonth() + '/' + createdDate.getDay() + '/' + createdDate.getFullYear()

      // Providers (Assuming one only)
      const providerPillContent = this.providerPillsForProviderKey(transaction.integration_data)
      const integraitonKey = _.keys(transaction.integration_data)[0]
      const integrationLink = transaction.integration_data[integraitonKey].url
      return (
        <tr className='transaction-row' key={idx}>
          <td className='td-first' scope='row'>{createdShortDate}</td>
          <td className='td-second' scope='pill-row'>{providerPillContent}</td>
          <td className='td-third'>
            {transaction.amount}
          </td>
          <td className='td-forth'>
            <a href={'http://' + integrationLink} target='_blank'>
              {transaction.description}
            </a>
          </td>
        </tr>
      )
    })

    return (
      <table className='table'>
        <thead>
          {headers}
        </thead>
        <tbody>
          {rows}
        </tbody>
      </table>
    )
  }

  _providerPillsForProviderKey(integrationData) {
    const providerKeys = _.keys(integrationData)
    const pills = _.map(providerKeys, (providerKey) => {
      const provider = this.props.providersByKey[providerKey]
      const integration = integrationData[providerKey]
      return (
        <Pill color={provider.color} key={providerKey} linkURL={integration.url} title={provider.name}/>
      )
    })
    return pills

  }

  _seperator(title) {
    return (
      <Col className={'seperator'} md={12}>
        <h4>{title}</h4>
        <div className={'seperator-line'}/>
      </Col>
    );
  }

  render() {
    let user = this.props.user
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
     * User Info
     */

    // Find provider if given
    const userProviderContent = this.providerPillsForProviderKey(user.integration_data)
    const userContent = (
      <div className="row personal-info">
        <div className="col-xs-12">
          <h4>{'Personal'}</h4>
        </div>
        <div className="col-xs-12">
          <dl className="dl-horizontal">
            {this.contentForInfo('Email', user.email, true)}
            {this.contentForInfo('First Name', user.first_name, true)}
            {this.contentForInfo('Last Name', user.last_name, true)}
            {this.contentForInfo('Title', user.title, true)}
            {this.contentForInfo('Phone', user.phone, true)}
            {this.contentForInfo('Integrations', userProviderContent, true)}
          </dl>
        </div>
      </div>
    )

    /**
     * Organization
     */
    let orgSection = null
    if (user.organization) {

      // Find provider if given
      const orgProviderContent = this.providerPillsForProviderKey(user.organization.integration_data)

      orgSection = (
        <div className="row organization">
          <div className="col-xs-12">
            <h4>{'Organization'}</h4>
          </div>
          <div className="col-xs-12">
            <dl className="dl-horizontal">
              {this.contentForInfo('Name', user.organization.name, true)}
              {this.contentForInfo('Industry', user.organization.industry, true)}
              {this.contentForInfo('Annual Rev', user.organization.annual_revenue, true)}
              {this.contentForInfo('Head Count', user.organization.size, true)}
              {this.contentForInfo('Mesh Users', user.organization.user_count, true)}
              {this.contentForInfo('Website', user.organization.website, true)}
              {this.contentForInfo('Integrations', orgProviderContent, true)}
            </dl>
          </div>
        </div>
      )
    }

    /**
     * Lists
     */
    let listSection = null
    if (user.lists) {
      const listsContent = this.contentForLists(user.lists)
      if (listsContent && user.lists.length) {
        listSection = (
          <div className="row lists">
            <div className="col-xs-12">
              <h4>{'Lists'}</h4>
            </div>
            <div className="col-xs-12">
              <dl className="dl-horizontal">
                {listsContent}
              </dl>
            </div>
          </div>
        )
      }
    }

    /**
     * Tickets
     */
    let threadsSection = null

    if (user.threads) {
      const threadsContent = this.contentForSupportTickets(user.threads)
      if (threadsContent && user.threads.length) {
        threadsSection = (
          <div className="row threads">
            <div className="col-xs-12">
              <h4>{'Support Tickets'}</h4>
            </div>
            <div className="col-xs-12">
              <dl className="dl-horizontal">
                {threadsContent}
              </dl>
            </div>
          </div>
        )
      }
    }

    /**
     * Transactions
     */
    let transactionsSection = null
    if (user.transactions) {
      const transactionsContent = this.contentForTransactions(user.transactions)
      if (transactionsContent && user.transactions.length) {
        transactionsSection = (
          <div className="row transactions">
            <div className="col-xs-12">
              <h4>{'Transactions'}</h4>
            </div>
            <div className="col-xs-12">
              <dl className="dl-horizontal">
                {transactionsContent}
              </dl>
            </div>
          </div>
        )
      }
    }

    return (
      <div className="user-detail-form">
        <div>
          <UserHeader user={this.props.user}/>
        </div>

        <div className="user-content">

          {userContent}

          {orgSection}

          {threadsSection}

          {transactionsSection}

          {listSection}

        </div>
        {footer}
      </div>
    );
  }
}

UserDetailForm.defaultProps = {
  displayActionButtons: true
}

UserDetailForm.propTypes = {
  displayActionButtons: PropTypes.bool,
  lists: PropTypes.object,
  onCancel: PropTypes.func.isRequired,
  onChange: PropTypes.func.isRequired,
  onUpdate: PropTypes.func.isRequired,
  providersByKey: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
}

export default UserDetailForm
