
import { REFRESH_PROVIDER_LIST, REQUEST_PROVIDERS, RECEIVE_PROVIDERS } from '../actions/providers'
import { REQUEST_OAUTH_URL_FOR_PROVIDER, RECEIVED_OAUTH_URL_FOR_PROVIDER, RECEIVED_OAUTH_CODE_FOR_PROVIDER } from '../actions/providers'
import _ from 'underscore'

const defaultState = {
	isFetchingOAuth: false,
	isFetching: false,
	didInvalidate: false,
	hudMessage: '',
	OAuthURL: null,
	providers: [],
	providersByKey: {}
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
		case RECEIVE_PROVIDERS: {
			let providersByKey = {}
			_.each(action.providers, (prov) => providersByKey[prov.key] = prov)
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				providers: action.providers,
				lastUpdated: action.ReceivedAt,
				providersByKey: providersByKey
			})
		}
		case REQUEST_OAUTH_URL_FOR_PROVIDER:
			return Object.assign({}, state, {
				hudMessage: action.hudMessage,
				isFetchingOAuth: true,
				OAuthURL: null,
				isFetching: false
			})
		case RECEIVED_OAUTH_URL_FOR_PROVIDER:
			return Object.assign({}, state, {
				hudMessage: action.hudMessage,
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