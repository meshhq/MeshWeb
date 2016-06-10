
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
    this.providerPillForTypeID = this._providerPillForTypeID.bind(this)
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
        } else if (label === 'integration') {
          // Stub for now until server gets in line
          const provider = this.providerForTypeID(5001)
          formattedValue = (
            <Pill color={provider.color} title={provider.name}/>
          )
        } else {
          formattedValue = value
        }
      }

      // Number check
      if (_.isNumber(value)) {
        formattedValue = value.toLocaleString()
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
      listsContent.push(this.contentForInfo('user count', list.user_count, list.id))
      listsContent.push(this.contentForInfo('description', list.description, true, list.id))
      listsContent.push(this.contentForInfo('integration', provider.name, true, list.id))
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

      return (        
        <tr className='ticket-row' key={idx}>
          <td scope='row'>{'06/05/2016'}</td>
          <td scope='pill-row'>{this.providerPillForTypeID(5001)}</td>
          <td>
            <OverlayTrigger overlay={tooltip} placement="top" >
              <p>{'300'}</p>
            </OverlayTrigger>
          </td>
          <td>{'Can\'t login'}</td>
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
        <th>{'date'}</th>
        <th>{'origin'}</th>
        <th>{'description'}</th>
        <th>{'amount'}</th>
      </tr>
    )

    const rows = _.map(transactions, (transaction, idx) => {
      const tooltip = (
        <Tooltip id={transaction.id}><strong>{'Transaction Link'}</strong><br></br>{'Links to your transaction'}</Tooltip>
      )

      return (        
        <tr className='transaction-row' key={idx}>
          <td scope='row'>{'06/05/2016'}</td>
          <td scope='pill-row'>{this.providerPillForTypeID(5001)}</td>
          <td>{'$100.00'}</td>
          <td>
            <OverlayTrigger overlay={tooltip} placement="top" >
              <a href="#" onClick={this.linkClicked}>
                {'Bought a unit ofasdh kjshf lsajkdf sadjhklfljksd fkj'}
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
    return _.find(this.props.providers, (provider) => {
      if (provider.type === typeID) {
        return provider
      }
    })
  }

  _providerPillForTypeID(typeID) {
    const provider = this.providerForTypeID(5001)
    const tooltip = (
      <Tooltip id={typeID}><strong>{'Provider Link'}</strong><br></br>{' This links out to the resource in the integration.'}</Tooltip>
    )
    return (
      <div>
        <OverlayTrigger overlay={tooltip} placement="top" >
          <Pill color={provider.color} title={provider.name}/>
        </OverlayTrigger>
      </div>
    )
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
    const userContent = (
      <div className="row personal-info">
        <div className="col-xs-12">
          <h4>{'Personal'}</h4>
        </div>
        <div className="col-xs-12">
          <dl className="dl-horizontal">
            {this.contentForInfo('email', user.email, true)}
            {this.contentForInfo('first name', user.first_name, true)}
            {this.contentForInfo('last name', user.last_name, true)}
            {this.contentForInfo('title', user.title, true)}
            {this.contentForInfo('phone', user.phone, true)}
            {this.contentForInfo('description', user.description, true)}
            {this.contentForInfo('integration', 'ff', true)}
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
      const provider = this.providerForTypeID(user.organization.origin_provider)
      let providerContent = null
      if (provider) {
        providerContent = this.contentForInfo('integration', provider.name, true)
      }

      orgSection = (
        <div className="row organization">
          <div className="col-xs-12">
            <h4>{'Organization'}</h4>
          </div>
          <div className="col-xs-12">
            <dl className="dl-horizontal">
              {this.contentForInfo('name', user.organization.name, true)}
              {this.contentForInfo('industry', user.organization.industry, true)}
              {this.contentForInfo('description', user.organization.description, true)}
              {this.contentForInfo('annual rev', user.organization.annual_revenue, true)}
              {this.contentForInfo('head count', user.organization.size, true)}
              {this.contentForInfo('mesh users', user.organization.user_count, true)}
              {this.contentForInfo('website', user.organization.website, true)}
              {providerContent}
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
