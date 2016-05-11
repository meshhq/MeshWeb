
import { GET } from '../helpers/api'

// This action is to indicate the desired
// refresh of the user table
export const REFRESH_INTEGRATION_LIST = 'REFRESH_INTEGRATION_LIST'
export function refreshProviderList() {
	return {
		type: REFRESH_INTEGRATION_LIST
	}
}

// This function is to indicate that the
// network request action has begun
export const REQUEST_INTEGRATIONS = 'REQUEST_INTEGRATIONS'
export function requestedIntegrations() {
	return {
		type: REQUEST_INTEGRATIONS
	}
}

export const RECEIVE_INTEGRATIONS = 'RECEIVE_INTEGRATIONS'
export function receivedIntegrations(json) {
	return {
		type: RECEIVE_INTEGRATIONS,
		integrations: json,
		receivedAt: Date.now()
	}
}

export function refreshIntegrations() {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(requestedIntegrations())
			const appID = getState().app.id
			return GET(`apps/${appID}/integrations`)
					.then(function(json){
						dispatch(receivedIntegrations(json))
					}
				)
			}
	}
}
