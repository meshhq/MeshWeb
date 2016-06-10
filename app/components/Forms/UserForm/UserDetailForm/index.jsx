
import React, { Component, PropTypes } from 'react'
import { Modal, Col, Button } from 'react-bootstrap'
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

  _contentForLists(lists) {
    let listsContent = []
    for (let i = 0; i < lists.length; i++) {
      const list = lists[i]
      const provider = this.providerForTypeID(list.origin_provider)
      listsContent.push(
        <div className="col-xs-12 lineitem-title">
          <h5>{list.name}</h5>
        </div>
      )
      listsContent.push(this.contentForInfo('user count', list.user_count, list.id))
      listsContent.push(this.contentForInfo('description', list.description, true, list.id))
      listsContent.push(this.contentForInfo('integration', provider.name, true, list.id))
    }
    return listsContent
  }

  _contentForSupportTickets(tickets) {
    let ticketsContent = []
    for (let i = 0; i < tickets.length; i++) {
      const ticket = tickets[i]
      const provider = this.providerForTypeID(ticket.origin_provider)
      ticketsContent.push(
        <div className="col-xs-12 lineitem-title">
          <h5>{'Support Ticket Title'}</h5>
        </div>
      )
      ticketsContent.push(this.contentForInfo('description', ticket.description, true, ticket.id))
      ticketsContent.push(this.contentForInfo('integration', provider.name, true, ticket.id))
    }
    return ticketsContent
  }

  _contentForTransactions(transactions) {
    let transactionContent = []
    for (let i = 0; i < transactions.length; i++) {
      const transaction = transactions[i]
      const provider = this.providerForTypeID(transaction.origin_provider)
      transactionContent.push(
        <div className="col-xs-12 lineitem-title">
          <h5>{'Transaction Title'}</h5>
        </div>
      )
      transactionContent.push(this.contentForInfo('amount', transaction.amount, true, transaction.id))
      transactionContent.push(this.contentForInfo('integration', provider.name, true, transaction.id))
    }
    return transactionContent 
  }

  _providerForTypeID(typeID) {
    return _.find(this.props.providers, (provider) => {
      if (provider.type === typeID) {
        return provider
      }
    })
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
          <h4>{'Personal Info'}</h4>
        </div>
        <dl className="dl-horizontal">
          {this.contentForInfo('email', user.email, true)}
          {this.contentForInfo('first name', user.first_name)}
          {this.contentForInfo('last name', user.last_name)}
          {this.contentForInfo('title', user.title)}
          {this.contentForInfo('phone', user.phone)}
          {this.contentForInfo('description', user.description, true)}
        </dl>
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
              {this.contentForInfo('annual rev', user.organization.annual_revenue)}
              {this.contentForInfo('head count', user.organization.size)}
              {this.contentForInfo('mesh users', user.organization.user_count)}
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
      if (ticketsContent && ticketsContent.length) {
        ticketsSection = (
          <div className="row lists">
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
      if (transactionsContent && transactionsContent.length) {
        transactionsSection = (
          <div className="row lists">
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
                      
          {listSection}

          {ticketsSection}

          {transactionsSection}

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
