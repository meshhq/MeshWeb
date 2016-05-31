
import { GET } from '../helpers/api'

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
export const LOAD_OAUTH_FOR_PROVIDER = 'LOAD_OAUTH_FOR_PROVIDER'
export function requestedOAuthForProvider() {
	return {
		type: LOAD_OAUTH_FOR_PROVIDER,
		isFetchingOAuth: true,
		isFetching: false
	}
}

export const RECEIVED_OAUTH_FOR_PROVIDER = 'RECEIVE_OAUTH_FOR_PROVIDER'
export function receivedOAuthForProvider() {
	return {
		type: RECEIVED_OAUTH_FOR_PROVIDER,
		isFetchingOAuth: false,
		receivedAt: Date.now()
	}
}

// https://app.meshdata.io/oauth/salesforce?code=aPrxtI4fE7jL0iTEWY2cPLfbJpgR95PgqMLnW2wpQkhCdvVU_W6WRc4RboBrqVrJFhH9Xsaddg%3D%3D
export function requestOAuthURL(providerName) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(requestedOAuthForProvider())
			const oAuthPromise = new Promise((resolve, reject) => {
					GET('oauth/' + providerName)
					.then(function(json){
						dispatch(receivedOAuthForProvider())
						resolve(json.url)
					}).catch(() => {
						dispatch(receivedOAuthForProvider())
						reject()
					})
			})
			return oAuthPromise
		}
	}
}
