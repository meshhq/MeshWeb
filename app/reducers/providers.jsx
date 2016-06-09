
import { REFRESH_PROVIDER_LIST, REQUEST_PROVIDERS, RECEIVE_PROVIDERS } from '../actions/providers'
import { REQUEST_OAUTH_URL_FOR_PROVIDER, RECEIVE_OAUTH_URL_FOR_PROVIDER, RECEIVED_OAUTH_CODE_FOR_PROVIDER } from '../actions/providers'

const defaultState = {
	isFetchingOAuth: false,
	isFetching: false,
	didInvalidate: false,
	hudMessage: '',
	OAuthURL: null,
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
		case REQUEST_OAUTH_URL_FOR_PROVIDER:
			return Object.assign({}, state, {
				isFetchingOAuth: true,
				OAuthURL: null,
				isFetching: false
			})
		case RECEIVE_OAUTH_URL_FOR_PROVIDER:
			return Object.assign({}, state, {
				isFetchingOAuth: false,
				OAuthURL: action.url,
				isFetching: false
			})
		case RECEIVED_OAUTH_CODE_FOR_PROVIDER:
			return Object.assign({}, state, {
				isFetchingOAuth: true,
				isFetching: false
			})
		default:
			return state
	}
}

export default providers;