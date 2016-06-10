
import React, { Component, PropTypes } from 'react'
import { Modal, Col, Button, OverlayTrigger, Tooltip } from 'react-bootstrap'
import Pill from '../../../Shared/Pill'
import UserHeader from './UserHeader'
import _ from 'underscore'

class UserDetailForm extends Component {
  displayName: 'User Details';
  constructor(props, context) {
    super(props, context);

    // Binding methods
    this.contentForInfo = this._contentForInfo.bind(this)
    this.contentForLists = this._contentForLists.bind(this)
    this.providerForTypeID = this._providerForTypeID.bind(this)
    this.contentForSupportTickets = this._contentForSupportTickets.bind(this)
    this.contentForTransactions = this._contentForTransactions.bind(this)
    this.linkClicked = this._linkClicked.bind(this)
    this.transactionsTableWithTransactions = this._transactionsTableWithTransactions.bind(this)
    this.providerPillsForTypeIDs = this._providerPillsForTypeIDs.bind(this)
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
        if (label === 'email' || label === 'website') {
          formattedValue = (
            <a href="#" onClick={this.linkClicked}>{value}</a>
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
      if (value) {
        formattedValue = value
      }

      // If theres a value, return html
      if (formattedValue) {
        return (
          <div className={(full ? 'col-xs-12' : 'col-xs-6') + ' info-field'} key={label + contentId}>
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
          <a href="#" onClick={this.linkClicked}>
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

  _contentForSupportTickets(tickets) {
    return this.supportTicketsTableWithTickets(tickets)
  }

  _supportTicketsTableWithTickets(tickets) {
    // Standard Tooltip
    const headers = (
      <tr>
        <th>{'date'}</th>
        <th>{'origin'}</th>
        <th>{'number'}</th>
        <th>{'subject'}</th>
      </tr>
    )

    const rows = _.map(tickets, (ticket, idx) => {
      const tooltip = (
        <Tooltip id={ticket.id}><strong>{'Support Ticket Link'}</strong><br></br>{'Links to your support ticket'}</Tooltip>
      )
      const providerIDs = _.allKeys(ticket.integration_data)
      const createdDate = new Date(ticket.created_at)
      const createdShortDate = createdDate.getMonth() + '/' + createdDate.getDay() + '/' + createdDate.getFullYear()
      return (        
        <tr className='ticket-row' key={idx}>
          <td scope='row'>{createdShortDate}</td>
          <td scope='pill-row'>{this.providerPillsForTypeIDs(providerIDs)}</td>
          <td>
            <OverlayTrigger overlay={tooltip} placement="top" >
              <p>{'300'}</p>
            </OverlayTrigger>
          </td>
          <td>{ticket.description}</td>
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
        <th>{'Date'}</th>
        <th>{'Origin'}</th>
        <th>{'Description'}</th>
        <th>{'Amount'}</th>
      </tr>
    )

    const rows = _.map(transactions, (transaction, idx) => {
      const tooltip = (
        <Tooltip id={transaction.id}><strong>{'Transaction Link'}</strong><br></br>{'Links to your transaction'}</Tooltip>
      )

      // Date
      const createdDate = new Date(transaction.created_at)
      const createdShortDate = createdDate.getMonth() + '/' + createdDate.getDay() + '/' + createdDate.getFullYear()

      // Providers
      const providerIDs = _.allKeys(transaction.integration_data)
      const providerPillContent = this.providerPillsForTypeIDs(providerIDs)
      return (        
        <tr className='transaction-row' key={idx}>
          <td scope='row'>{createdShortDate}</td>
          <td scope='pill-row'>{providerPillContent}</td>
          <td>{transaction.amount}</td>
          <td>
            <OverlayTrigger overlay={tooltip} placement="top" >
              <a href="#" onClick={this.linkClicked}>
                {transaction.description}
              </a>
            </OverlayTrigger>
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

  _providerForTypeID(typeID) {
    // Type Checking for Number
    if (!_.isNumber(typeID)) {
      typeID = Number(typeID)
    }

    return _.find(this.props.providers, (provider) => {
      if (provider.type === typeID) {
        return provider
      }
    })
  }

  _providerPillsForTypeIDs(typeIDs) {
    const pills = _.map(typeIDs, (typeID) => {
      const provider = this.providerForTypeID(typeID)
      const tooltip = (
        <Tooltip id={typeID}><strong>{'Provider Link'}</strong><br></br>{' This links out to the resource in the integration.'}</Tooltip>
      )
      if (!provider) {
        return null
      }
      return (
        <div className='provider-pill-wrapper' key={typeID}>
          <OverlayTrigger overlay={tooltip} placement="top" >
            <Pill color={provider.color} title={provider.name}/>
          </OverlayTrigger>
        </div>
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
    console.log(user)
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
    const userProviders = _.allKeys(user.integration_data)
    const userProviderContent = this.providerPillsForTypeIDs(userProviders)
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
      const orgProviders = _.allKeys(user.organization.integration_data)
      const orgProviderContent = this.providerPillsForTypeIDs(orgProviders)

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
      if (listsContent && listsContent.length) {
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
    let ticketsSection = null
    if (user.tickets) {
      const ticketsContent = this.contentForSupportTickets(user.tickets)
      if (ticketsContent) {
        ticketsSection = (
          <div className="row tickets">
            <div className="col-xs-12">
              <h4>{'Support Tickets'}</h4>
            </div>
            <div className="col-xs-12">
              <dl className="dl-horizontal">
                {ticketsContent}
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
    if (user.tickets) {
      const transactionsContent = this.contentForTransactions(user.transactions)
      if (transactionsContent) {
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

          {ticketsSection}

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
  providers: PropTypes.array.isRequired,
  user: PropTypes.object.isRequired
}

export default UserDetailForm
