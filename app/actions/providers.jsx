
import { GET, POST } from '../helpers/api'
import { refreshIntegrations, activateIntegration } from './integrations'

// This action is to indicate the desired
// refresh of the user table
export const REFRESH_PROVIDER_LIST = 'REFRESH_PROVIDER_LIST'
export function refreshProviderList() {
	return {
		type: REFRESH_PROVIDER_LIST
	}
}

// This function is to indicate that the
// network request action has begun
export const REQUEST_PROVIDERS = 'REQUEST_PROVIDERS'
export function requestedProviders() {
	return {
		type: REQUEST_PROVIDERS
	}
}

export const RECEIVE_PROVIDERS = 'RECEIVE_PROVIDERS'
export function receivedProviders(json) {
	return {
		type: RECEIVE_PROVIDERS,
		providers: json,
		receivedAt: Date.now()
	}
}

export function refreshProviders() {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(requestedProviders())
			return GET('providers')
					.then(function(json){
						dispatch(receivedProviders(json))
					}
				)
			}
	}
}

//------------------------------------------------------------------------------
// OAUTH
//------------------------------------------------------------------------------

// This action is to fetch the OAuth information for a given provider
export const REQUEST_OAUTH_URL_FOR_PROVIDER = 'REQUEST_OAUTH_URL_FOR_PROVIDER'
export function requestedOAuthURLForProvider() {
	return {
		hudMessage: 'Redirecting...',
		type: REQUEST_OAUTH_URL_FOR_PROVIDER,
		isFetchingOAuth: true,
		isFetching: false
	}
}

export function exchangingOAuthInfoWithMesh() {
	return {
		hudMessage: 'Authorizing...',
		type: REQUEST_OAUTH_URL_FOR_PROVIDER,
		isFetchingOAuth: true,
		isFetching: false
	}
}

export const RECEIVED_OAUTH_URL_FOR_PROVIDER = 'RECEIVED_OAUTH_URL_FOR_PROVIDER'
export function receivedOAuthURLForProvider() {
	return {
		hudMessage: '',
		type: RECEIVED_OAUTH_URL_FOR_PROVIDER,
		isFetchingOAuth: false,
		receivedAt: Date.now()
	}
}

// For when the user's browser is redirected back to the redirect URL
export const RECEIVED_OAUTH_CODE_FOR_PROVIDER = 'RECEIVED_OAUTH_CODE_FOR_PROVIDER'
export function receivedOAuthCodeForProvider() {
	return {
		type: RECEIVED_OAUTH_CODE_FOR_PROVIDER,
		isFetchingOAuth: true,
		receivedAt: Date.now()
	}
}

/**
 * requestOAuthURL is used for fetching the OAuth URL for a given provider
 * @param  {String} providerName
 * @return {Promise} cb promise
 */
export function requestOAuthURL(providerName) {
	return (dispatch) => {
		dispatch(requestedOAuthURLForProvider())
		const oAuthPromise = new Promise((resolve, reject) => {
				GET('oauth/' + providerName)
				.then(function(json){
					dispatch(receivedOAuthURLForProvider())
					resolve(json.url)
				}).catch(() => {
					dispatch(receivedOAuthURLForProvider())
					reject()
				})
		})
		return oAuthPromise
	}
}

/**
 * authOAuthCode is used for fetching the OAuth URL for a given provider
 * @param  {String} providerName
 * @return {Promise} cb promise
 */
export function registerOAuthCodeWithMesh(providerName, OAuthCode) {
	return (dispatch, getState) => {
		dispatch(exchangingOAuthInfoWithMesh())
		const oAuthPromise = new Promise((resolve) => {
				const appID = getState().app.id
				const params = { code: OAuthCode, provider: providerName }
				POST(`apps/${appID}/oauth/` + providerName, params)
				.then(function(integration){
					dispatch(receivedOAuthURLForProvider())
					dispatch(refreshIntegrations())
					dispatch(activateIntegration(integration))
				}).catch(() => {
					dispatch(receivedOAuthURLForProvider())
				})
		})
		return oAuthPromise
	}
}
