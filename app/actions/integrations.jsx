
import { GET, POST } from '../helpers/api'

//------------------------------------------------------------------------------
// Creating Integration
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const CREATING_INTEGRATION = 'CREATING_INTEGRATION'
export function creatingIntegration() {
	return {
		type: CREATING_INTEGRATION
	}
}

// The action to indicate a list has been created.
export const CREATED_INTEGRATION = 'CREATED_INTEGRATION'
export function createdIntegration(json) {
	return {
		type: CREATED_INTEGRATION,
		user: json,
		createdAt: Date.now()
	}
}

export function createIntegration(params) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			const appID = getState().app.id
			return POST(`apps/${appID}/integrations`, params)
			.then(function(json){
					dispatch(createdIntegration(json))
					dispatch(refreshIntegrations())
					dispatch(activateIntegration(json))
				}
			)
		}
	}
}


//------------------------------------------------------------------------------
// Activate Integration
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const ACTIVATING_INTEGRATION = 'ACTIVATING_INTEGRATION'
export function activatingIntegration() {
	return {
		type: ACTIVATING_INTEGRATION
	}
}

// The action to indicate a list has been created.
export const ACTIVATED_INTEGRATION = 'ACTIVATED_INTEGRATION'
export function activatedIntegration(json) {
	return {
		type: ACTIVATED_INTEGRATION,
		user: json,
		createdAt: Date.now()
	}
}

export function activateIntegration(params) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(activatingIntegration())
			const appID = getState().app.id
			return POST(`apps/${appID}/integrations/${params.id}/activate`)
			.then(function(json){
					dispatch(activatedIntegration(json))
				}
			)
		}
	}
}

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
