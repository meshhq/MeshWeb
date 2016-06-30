
import { REFRESH_INTEGRATION_LIST, REQUEST_INTEGRATIONS, RECEIVE_INTEGRATIONS } from '../actions/integrations'
import { integrationIsSyncing } from '../constants/integrationSyncStatus'
import _ from 'underscore'

const defaultState = {
	isFetching: false,
	isSyncing: false,
	didInvalidate: false,
	hudMessage: '',
	integrations: []
}

function integrationsAreCurrentlySyncing(integrations) {
  const syncingIntegration = _.find(integrations, (integration) => integrationIsSyncing(integration))
  return syncingIntegration !== undefined
}

function integrations(state = defaultState, action) {
	switch(action.type) {
		case REFRESH_INTEGRATION_LIST:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case REQUEST_INTEGRATIONS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: true
			})
		case RECEIVE_INTEGRATIONS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				isSyncing: integrationsAreCurrentlySyncing(action.integrations),
				integrations: action.integrations,
				lastUpdated: action.ReceivedAt
			})
		default:
			return state
	}
}

export default integrations;
