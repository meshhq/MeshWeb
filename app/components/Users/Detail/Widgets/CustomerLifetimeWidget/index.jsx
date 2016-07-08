
import React, { PropTypes } from 'react'
import { Tabs, Tab } from 'react-bootstrap'
import _ from 'underscore'

// Tab Glyphs
import mailGlyph from '../../../../../assets/images/mailGlyph.png'
import conversationGlyph from '../../../../../assets/images/conversationGlyph.png'
import fireGlyph from '../../../../../assets/images/fireGlyph.png'
import liferingGlyph from '../../../../../assets/images/liferingGlyph.png'
import purchaseGlyph from '../../../../../assets/images/purchaseGlyph.png'

// Event SVGs
import announcementEventSVG from '../../../../../assets/images/announcementEvent.svg'
import conversationEventSVG from '../../../../../assets/images/conversationEvent.svg'
import funnelEventSVG from '../../../../../assets/images/funnelEvent.svg'
import mailEventSVG from '../../../../../assets/images/mailEvent.svg'
import purchaseEventSVG from '../../../../../assets/images/purchaseEvent.svg'
import supportEventSVG from '../../../../../assets/images/supportEvent.svg'

// Inliner
import InlineSVG from 'svg-inline-react'

/**
 * Graph Widget...
 * @param  {String}         title     Title of Widget
 * @param  {String}         subtitle  Title of Widget
 * @param  {String}         timelineData  Section data for the widget.
 *                                       Object that is keyed by subject to an array of events
 *                                       ex: {messages: [{message obj}], email: [{email obj}], tickets: [{ticket obj}]}
 *                                       Note: All object must have a `date`
 *                                       Ex Object: {title: "$200.00 Payment", subTitle: "Starter Plan Payment", "integration_data": {stripe: {url: "http://someurl.com"}}, date: 4827397923498}
 */
const CustomerLifetimeWidget = ({ title, subTitle, timelineData, providersByKey }) => {

  // Breaking the timeline into sub-components
  let emails = []
  let conversations = []
  let tickets = []
  let transactions = []
  _.each(timelineData, (event) => {
    switch(event.type) {
      case 'email':
        emails.push(event)
        break;
      case 'conversation':
        conversations.push(event)
        break;
      case 'ticket':
        tickets.push(event)
        break;
      case 'transaction':
        transactions.push(event)
        break;
    }
  })

  // Build Lifetime Obj
  const lifetimeDataSource = [
    {
      title: 'All',
      glyph: fireGlyph,
      data: timelineData
    },
    {
      title: 'Mail',
      glyph: mailGlyph,
      data: emails
    },
    {
      title: 'Messages',
      glyph: conversationGlyph,
      data: conversations
    },
    {
      title: 'Purchases',
      glyph: purchaseGlyph,
      data: transactions
    },
    {
      title: 'Tickets',
      glyph: liferingGlyph,
      data: tickets
    }
  ]

  return (
    <div className="customer-lifetime-widget row">
      <div className="col-xs-12 title">
        <p>{title}</p>
      </div>
      <div className="col-xs-12 subtitle">
        <p>{subTitle}</p>
      </div>
      <div className="col-xs-12 chart">
        <TabsForSectionTitles lifetimeDataSource={lifetimeDataSource} providersByKey={providersByKey} />
      </div>
    </div>
  )
}

// Default Props
CustomerLifetimeWidget.propTypes = {
  providersByKey: PropTypes.object.isRequired,
  subTitle: PropTypes.string.isRequired,
  timelineData: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
}

// Display Name
CustomerLifetimeWidget.displayName = 'Graph Widget'

export default CustomerLifetimeWidget

/**
 * Non-exported Helper Methods
 */

// tabsForSectionTitles returns the tab and content for the given data
const TabsForSectionTitles = ({ lifetimeDataSource, providersByKey }) => {
  const tabs = _.map(lifetimeDataSource, (sectionData, idx) => {
    const { title, glyph, data } = sectionData

    // Need to differ between a transaction and a thread
    let tabContent = _.map(data, (event) => {
      const { type, id } = event
      switch(type) {
       case 'transaction':
         return <ContentRowForTransaction eventData={event} key={id} providersByKey={providersByKey} />
       default :
         return <ContentRowForThread eventData={event} key={id} providersByKey={providersByKey} />
      }  
    })
  
    const titleForTab = (
      <div className="tab-title-container">
        <span>{title}</span>
        <img className="tab-title-glyph" src={glyph} />
      </div>
    )    

    return (
      <Tab eventKey={idx} key={idx} tabClassName={'tab-selector'} title={titleForTab} >
        <div className="tab-row-content-container">
          {tabContent}
        </div>
      </Tab>
    )
  })

  return (
    <Tabs className="tabs-container" defaultActiveKey={0} id="timeline-tab-unit">
      {tabs}
    </Tabs>
  )
}

// contentRowForThread returns the formatted data for a given thread type
const ContentRowForThread = ({ eventData, providersByKey }) => {
  const { subject, description, integration_data, created_at, type } = eventData

  // Provider Native Link
  const { url } = integration_data

  // Provider Info
  const providerKey = _.keys(integration_data)[0]
  const provider = providersByKey[providerKey]
  const providerColorStyle = { color: provider.color }

  // Date of creation
  const createdDate = new Date(created_at)
  const createdShortDate = createdDate.getMonth() + '/' + createdDate.getDay() + '/' + createdDate.getFullYear()

  return (
    <div className="row row-eq-height" id="timeline-row">
      <div className="event-glyph">
        <InlineSVG src={svgForType(type)} />
      </div>
      <div className="col-xs-8 left-content">
        <p className="title">{subject}</p>
        <p className="sub-title">{description}</p>
        <a className="provider-link" href={url} style={providerColorStyle}>{'View In ' + provider.name}</a>
      </div>
      <div className="col-xs-4 right-content">
        <p className="created-at">{'Created at: ' + createdShortDate}</p>
      </div>
    </div>
  )
}

// contentRowForTransaction returns the formatted data for a given thread type
const ContentRowForTransaction = ({ eventData, providersByKey }) => {
  const { amount, description, integration_data, created_at, type } = eventData

  // Provider Native Link
  const { url } = integration_data

  // Provider Info
  const providerKey = _.keys(integration_data)[0]
  const provider = providersByKey[providerKey]
  const providerColorStyle = { color: provider.color }

  // Date of creation
  const createdDate = new Date(created_at)
  const createdShortDate = createdDate.getMonth() + '/' + createdDate.getDay() + '/' + createdDate.getFullYear()

  return (
    <div className="row row-eq-height" id="timeline-row">
      <div className="event-glyph">
        <InlineSVG src={svgForType(type)} />
      </div>
      <div className="col-xs-8 left-content">
        <p className="title">{'Purchase for ' + amount}</p>
        <p className="sub-title">{description}</p>
        <a className="provider-link" href={url} style={providerColorStyle} >{'View In ' + provider.name}</a>
      </div>
      <div className="col-xs-4 right-content">
        <p className="created-at">{'Created at: ' + createdShortDate}</p>
      </div>
    </div>
  )
}

// svgForType is a helper for determining the appropriate SVG for the
// type of the event
function svgForType(type) {
  switch(type) {
    case 'email':
      return mailEventSVG
    case 'conversation':
      return conversationEventSVG
    case 'ticket':
      return purchaseEventSVG
    case 'transaction':
      return mailEventSVG
  }
  return null
}