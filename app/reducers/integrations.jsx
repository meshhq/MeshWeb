import { REFRESH_INTEGRATION_LIST, REQUEST_INTEGRATIONS, RECEIVE_INTEGRATIONS } from '../actions/integrations'

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	hudMessage: '',
	integrations: []
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
				integrations: action.integrations,
				lastUpdated: action.ReceivedAt
			})
		default:
			return state
	}
}

export default integrations;
