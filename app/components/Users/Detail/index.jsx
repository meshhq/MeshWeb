
import React, { PropTypes } from 'react'
import ReactDOM from 'react-dom'
import { bindActionCreators } from 'redux'
import { connect } from 'react-redux'
import _ from 'underscore'

// Components
import ProfileHeroWidget from './Widgets/ProfileHeroWidget'
import InfoWidget from './Widgets/InfoWidget'
import GraphWidget from './Widgets/GraphWidget'
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
    console.log(dom.querySelectorAll('div.graph-continer'))
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
      labels: ['April', 'May', 'June', 'July'],
      datasets: [
        {
          label: 'My First dataset',
          fillColor: 'rgba(220,220,220,0.2)',
          strokeColor: 'rgba(220,220,220,1)',
          pointColor: 'rgba(220,220,220,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(220,220,220,1)',
          data: [81, 56, 55, 40]
        },
        {
          label: 'My Second dataset',
          fillColor: 'rgba(151,187,205,0.2)',
          strokeColor: 'rgba(151,187,205,1)',
          pointColor: 'rgba(151,187,205,1)',
          pointStrokeColor: '#fff',
          pointHighlightFill: '#fff',
          pointHighlightStroke: 'rgba(151,187,205,1)',
          data: [19, 86, 27, 90]
        }
      ]
    }

    const chartOptions = {
      scaleShowGridLines: true,
      scaleGridLineColor: 'rgba(0,0,0,.05)',
      scaleGridLineWidth: 1,
      scaleShowHorizontalLines: true,
      scaleShowVerticalLines: true,
      bezierCurve: true,
      bezierCurveTension: 0.4,
      pointDot: true,
      pointDotRadius: 4,
      pointDotStrokeWidth: 1,
      pointHitDetectionRadius: 20,
      datasetStroke: true,
      datasetStrokeWidth: 2,
      datasetFill: true,
      legendTemplate: '<ul class=\"<%=name.toLowerCase()%>-legend\"><% for (var i=0; i<datasets.length; i++){%><li><span style=\"background-color:<%=datasets[i].strokeColor%>\"></span><%if(datasets[i].label){%><%=datasets[i].label%><%}%></li><%}%></ul>'
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
      data_analytics : [
        {
          title: 'Total MRR',
          subTitle: 'Alot of money'
        },
        {
          title: 'Life Time Value (LTV)',
          subTitle: 'Alot of value'
        },
        {
          title: 'Some Other Metric (SOM)',
          subTitle: 'Pump Da Numbers'
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
    let graphs = _.map(payload.data_analytics, (data, idx) => {
      let spacerStyle = {}
      if (idx == 0) {
        spacerStyle['padding-left'] = 40
      }
      return (
        <div className="col-xs-12 col-sm-4" key={data.title}>
          <div className='content-container graph-continer'>
            <GraphWidget 
              graphData={chartData} 
              graphOptions={chartOptions} 
              height={this.state.graphContainerHeight} 
              subTitle={data.subTitle} 
              title={data.title} 
              width={this.state.graphContainerWidth}
            />
          </div>
        </div>
      )}
    )

    return (
      <div className="user-detail-component">
        <div className="container-row row">
          <div className="col-xs-12 col-sm-3 leading-continer">
            <div className="content-container">
              <ProfileHeroWidget extraInfo={extraInfo} imgURL={imgURL} name={name} title={title} />
              <InfoWidget infoPairs={userInfoPairs} title={'User Information'} />
              <InfoWidget infoPairs={orgInfoPairs} title={'Company Information'} />
            </div>
          </div>
          <div className="col-xs-12 col-sm-6 main-continer">

            <div className="graph row">
              {graphs}
            </div>

            <div className="lifecycle row">
              <div className="col-xs-12 lifecycle-continer">
                
              </div>
            </div>

          </div>
          <div className="col-xs-12 col-sm-3 trailing-container">
            <div className="content-container">
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

