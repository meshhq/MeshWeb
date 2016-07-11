
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'

// Components
import ProfileHeroWidget from './Widgets/ProfileHeroWidget'
import InfoWidget from './Widgets/InfoWidget'
import TrackingInfoWidget from './Widgets/TrackingInfoWidget'
import GraphWidget from './Widgets/GraphWidget'
import CustomerLifetimeWidget from './Widgets/CustomerLifetimeWidget'
import Pill from '../../Shared/Pill'

// HAWKSs
import { IntervalWrapper } from '../../../hawks/interval'

// Actions
import * as UserActions from '../../../actions/users'
import * as IntegrationActions from '../../../actions/integrations'

// ID for tracking the polling w/ the token
const USER_POLLING_TOKEN = 'USER_POLLING_TOKEN'

// Transitions
//const ReactCSSTransitionGroup = require('react-addons-css-transition-group');

class UserDetail extends React.Component {
  constructor(props, context) {
    super(props, context);

    // Integration Sync State
    this.checkForIntegrationsCurrentlySyncing = this._checkForIntegrationsCurrentlySyncing.bind(this)
    this.providerPillsForProviderIntegrationData = this._providerPillsForProviderIntegrationData.bind(this)
    this.handleResize = this._handleResize.bind(this)

    // Setup our data
    this.state = {
      detailUser: {},
      graphContainerHeight: 0,
      graphContainerWidth: 0
    };
  }

  // First: Mounted
  componentDidMount() {
    window.addEventListener('resize', this.handleResize);
    this.handleResize()
  }

  // First: Received props
  componentWillReceiveProps() {
    
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleResize);
  }

  // Watches for resizing to alert the graphs
  _handleResize() {
    let dom = ReactDOM.findDOMNode(this)
    const width = dom.querySelectorAll('div.graph-continer')[0].clientWidth
    const height = dom.querySelectorAll('div.graph-continer')[0].clientHeight
    if (this.state.graphContainerWidth !== width) {
      this.setState({
        graphContainerHeight: height,
        graphContainerWidth: width
      }) 
    }
  }

  // Checks for currently syncing integrations
  _checkForIntegrationsCurrentlySyncing() {
    if (this.props.integrationState.isSyncing) {
      const syncFunc = this.props.userActions.refreshUsers
      this.props.setIntervalWithToken(USER_POLLING_TOKEN, syncFunc, 3000)
    } else {
      this.props.removeIntervalWithToken(USER_POLLING_TOKEN)
    }
  }

  _providerPillsForProviderIntegrationData(integrationData) {
    const providerKeys = _.keys(integrationData)
    const pills = _.map(providerKeys, (providerKey) => {
      const provider = this.props.providerState.providersByKey[providerKey]
      const integration = integrationData[providerKey]
      return (
        <Pill color={provider.color} key={providerKey} linkURL={integration.url} title={provider.name}/>
      )
    })
    return pills
  }

  render() {

    /**
     * TEMP DATA STRUCTURE BEGIN
     */
    
    /**
     * Testing Data
     */
    const chartData = {
      labels: ['6/5', '6/12', '6/19', '6/26', '7/3', '7/10'],
      datasets: [
        {
          label: 'Aggregrate API Calls',
          fill: true,
          data: [4500, 5000, 6200, 6300, 6500, 7000],
          lineTension: 0.1,
          backgroundColor: 'rgba(75,192,192,0.4)',
          borderColor: 'rgba(75,192,192,1)',
          borderCapStyle: 'butt',
          borderDash: [],
          borderDashOffset: 0.0,
          borderJoinStyle: 'miter',
          pointBorderColor: 'rgba(75,192,192,1)',
          pointBackgroundColor: '#fff',
          pointBorderWidth: 1,
          pointHoverRadius: 5,
          pointHoverBackgroundColor: 'rgba(75,192,192,1)',
          pointHoverBorderColor: 'rgba(220,220,220,1)',
          pointHoverBorderWidth: 2,
          pointRadius: 3,
          pointHitRadius: 10,
          borderWidth: 1
        }
      ]
    }

    const chartOptions = {
      bezierCurve: true,
      bezierCurveTension: 0.4,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      pointDot: false,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      maintainAspectRatio: false,
      responsive: true,
      scaleShowGridLines: true,
      scaleGridLineColor: 'rgba(1,1,1,.05)',
      scaleGridLineWidth: 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      showScale: false,
      legend: {
        display: false
      },
      scales: {
        yAxes: [{
          ticks: {
            beginAtZero:true
          }
        }]
      }
    }

    const payload = {
      user: {
        imgURL: 'https://avatars3.githubusercontent.com/u/1266416?v=3&s=460',
        first_name: 'Taylor',
        last_name: 'Halliday',
        phone: '206-920-8108',
        email: 'taylor@meshsdfsdfsdfdata.io',
        title: 'Baller',
        extraInfo: 'Member Since October 2007',
        integration_info: {
          hubspot: {
            url: 'seattletimes.com'
          },
          zendesk: {
            url: 'gohuskies.com'
          }
        }
      },
      organization: {
        name: 'Mesh Data',
        website: 'meshdata.io',
        users: '100',
        annual_revenue: '$100M',
        head_count: '300',
        industry: 'Kicking Ass',
        integration_info: {
          hubspot: {
            url: 'seattletimes.com'
          },
          zendesk: {
            url: 'gohuskies.com'
          }
        }
      },
      'timeline': [
          {
              'amount': '499.99',
              'created_at': 1467909403163,
              'description': 'Growth Plan',
              'email': 'emily.thomas@snapchat.com',
              'id': '577e851b791e4b6a92c868aa',
              'integration_data': {
                  'pardot': {
                      'url': 'https://www.pardot.com/'
                  }
              },
              'origin_provider': 2003,
              'type': 'transaction',
              'updated_at': 1467909403163,
              'user_id': '577e851b791e4b6a92c868a7'
          },
          {
              'amount': '499.99',
              'created_at': 1467909403163,
              'description': 'Growth Plan',
              'email': 'emily.thomas@snapchat.com',
              'id': '577e851b791e4b6a92c868ab',
              'integration_data': {
                  'mixpanel': {
                      'url': 'https://www.mixpanel.com/'
                  }
              },
              'origin_provider': 6001,
              'type': 'transaction',
              'updated_at': 1467909403163,
              'user_id': '577e851b791e4b6a92c868a7'
          },
          {
              'application_id': '577e851a791e4b6a92c8688f',
              'created_at': 1467909403139,
              'description': 'Quia at incidunt nulla adipisci rem autem nesciunt quisquam aspernatur omnis sunt consequatur ipsam.',
              'email': 'emily.thomas@snapchat.com',
              'id': '577e851b791e4b6a92c868a8',
              'integration_data': {
                  'mesh': {
                      'url': 'www.mesh.com'
                  }
              },
              'origin_provider': 1000,
              'subject': 'I Need Help!',
              'type': 'email',
              'updated_at': 1467909403139,
              'user_id': '577e851b791e4b6a92c868a7'
          },
          {
              'application_id': '577e851a791e4b6a92c8688f',
              'created_at': 1467909403139,
              'description': 'Quos voluptas eum earum dolores maiores provident doloribus labore aspernatur enim est ab.',
              'email': 'emily.thomas@snapchat.com',
              'id': '577e851b791e4b6a92c868a9',
              'integration_data': {
                  'pardot': {
                      'url': 'https://www.pardot.com/'
                  }
              },
              'origin_provider': 2003,
              'subject': 'I Need Help!',
              'type': 'ticket',
              'updated_at': 1467909403139,
              'user_id': '577e851b791e4b6a92c868a7'
          }
      ],
      usage_data : [
        {
          title: 'Subscription Information',
          data: [
            { title: 'Product', value: 'Sweet Product' },
            { title: 'Plan', value: 'Hacker Plan' }
          ]
        },
        {
          title: 'Usage Info',
          data: [
            { title: 'Uses', value: 'Sweet Product' },
            { title: 'Plan', value: 'Hacker Plan' },
            { title: 'Visits', value: '320 Views' }
          ]
        },
        {
          title: 'Subscription Information',
          data: [
            { title: 'Product', value: 'Sweet Product' },
            { title: 'Plan', value: 'Hacker Plan' }
          ]
        }
      ],
      data_analytics : [
        {
          title: 'Total MRR',
          subTitle: 'Alot of money'
        }
      ],
      financial_data : [
        {
          title: 'LTV / Monthly Spend',
          data: [
            { title: 'LTV', value: '$18,204' },
            { title: 'YTD Charges', value: '$9,283.00' },
            { title: 'Org Spend', value: '$25,283.00' }
          ]
        }
      ]
    }

   /**
    * TEMP DATA STRUCTURE END
    */
    
    // User Info
    const { imgURL, title, extraInfo, phone, first_name, last_name, email } = payload.user
    const userIntegrationInfo = payload.user.integration_info
    const userIntegrationPills = this.providerPillsForProviderIntegrationData(userIntegrationInfo)

    // Org Info
    const { name, website, users, annual_revenue, head_count, industry } = payload.organization
    const orgIntegrationInfo = payload.organization.integration_info
    const orgIntegrationPills = this.providerPillsForProviderIntegrationData(orgIntegrationInfo)

    // Timeline Info
    const { timeline } = payload

    // Usage Data
    const { usage_data, financial_data } = payload

    // Providers
    const { providersByKey } = this.props.providerState

    // Info Pairs for User
    const userInfoPairs = [
      { title:'First Name', value: first_name },
      { title:'Last Name', value: last_name },
      { title:'Title', value: title },
      { title:'Phone', value: phone },
      { title:'Email', value: email },
      { title:'Integrations', value: userIntegrationPills }
    ]

    // Info Pairs for Company
    const orgInfoPairs = [
      { title:'Name', value: name },
      { title:'Website', value: website },
      { title:'Users', value: users },
      { title:'Annual Rev', value: annual_revenue },
      { title:'Head Count', value: head_count },
      { title:'Industry', value: industry },
      { title:'Integrations', value: orgIntegrationPills }
    ]

    // Analytics Info
    const graphCount = payload.data_analytics.length
    const responsiveClassName = 'col-sm-' + 12 / graphCount
    let graphs = _.map(payload.data_analytics, (data) =>
      <div className={'col-xs-12 ' + responsiveClassName + ' graph-col'} key={data.title}>
        <div className='content-container graph-continer'>
          <GraphWidget 
            containerWidth={this.state.graphContainerWidth}
            graphData={chartData} 
            graphOptions={chartOptions} 
            subTitle={data.subTitle} 
            title={data.title} 
          />
        </div>
      </div>
    )

    return (
      <div className='user-detail-component'>
        <div className='container-row row'>
          <div className='col-xs-12 col-sm-3 leading-continer'>
            <div className='content-container'>
              <ProfileHeroWidget extraInfo={extraInfo} imgURL={imgURL} name={name} title={title} />
              <InfoWidget infoPairs={userInfoPairs} title={'User Information'} />
              <InfoWidget infoPairs={orgInfoPairs} title={'Company Information'} />
            </div>
          </div>
          <div className='col-xs-12 col-sm-6 main-continer'>

            <div className='graph row'>
              {graphs}
            </div>

            <div className='lifecycle row'>
              <div className='col-xs-12 lifecycle-continer'>
                <div className='content-container'>
                  <CustomerLifetimeWidget
                    providersByKey={providersByKey}
                    subTitle={'Customer Lifetime'} 
                    timelineData={timeline}
                    title={payload.user.first_name + ' ' + payload.user.last_name} 
                  />
                </div>
              </div>
            </div>

          </div>
          <div className='col-xs-12 col-sm-3 trailing-container'>
            <div className='content-container'>
              <TrackingInfoWidget 
                subtitle={'Customer Financial Info'}
                title={'Financial Metrics'} 
                trackingData={financial_data} 
              />
            </div>
            <div className='content-container'>
              <TrackingInfoWidget 
                subtitle={'Custom Events You Tell Us About'}
                title={'Event Tracking'} 
                trackingData={usage_data} 
              />
            </div>
          </div>
        </div>
      </div>
    );
  }
}

UserDetail.displayName = 'User Detail';

UserDetail.defaultProps = {
  user: {}
}

UserDetail.propTypes = {
  integrationActions: PropTypes.object.isRequired,
  integrationState: PropTypes.object.isRequired,
  listState: PropTypes.object.isRequired,
  providerState: PropTypes.object.isRequired,
  removeIntervalWithToken: PropTypes.func.isRequired,
  setIntervalWithToken: PropTypes.func.isRequired,
  userActions: PropTypes.object.isRequired,
  userState: PropTypes.object.isRequired
}

function mapStateToProps(state) {
  return {
    integrationState: state.integrations,
    listState: state.lists,
    providerState: state.providers,
    userState: state.users
  }
}

function mapDispatchToProps(dispatch) {
  return {
    integrationActions: bindActionCreators(IntegrationActions, dispatch),
    userActions: bindActionCreators(UserActions, dispatch)
  }
}

// Wrapping the Provider component in a HOC
const WrappedUserDetail = IntervalWrapper(UserDetail)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(WrappedUserDetail)

