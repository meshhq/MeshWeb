
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
