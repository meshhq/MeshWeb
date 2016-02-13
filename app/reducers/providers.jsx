import { REFRESH_PROVIDER_LIST, REQUEST_PROVIDERS, RECEIVE_PROVIDERS } from '../actions/providers'

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	providers: []
}

function providers(state = defaultState, action) {
	switch(action.type) {
		case REFRESH_PROVIDER_LIST:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case REQUEST_PROVIDERS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: true
			})
		case RECEIVE_PROVIDERS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				providers: action.providers,
				lastUpdated: action.ReceivedAt
			})
		default:
			return state
	}
}

export default providers;