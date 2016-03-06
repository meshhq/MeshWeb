
import { GET } from '../helpers/api'

// This action is to indicate the desired
// refresh of the user table
export const REFRESH_ORGANIZATION_LIST = 'REFRESH_ORGANIZATION_LIST'
export function refreshProviderList() {
	return {
		type: REFRESH_ORGANIZATION_LIST
	}
}

// This function is to indicate that the 
// network request action has begun
export const REQUEST_ORGANIZATIONS = 'REQUEST_ORGANIZATIONS'
export function requestedOrganizations() {
	return {
		type: REQUEST_ORGANIZATIONS
	}
}

export const RECEIVE_ORGANIZATIONS = 'RECEIVE_ORGANIZATIONS'
export function receivedOrganizations(json) {
	return {
		type: RECEIVE_ORGANIZATIONS,
		organizations: json,
		receivedAt: Date.now()
	}
}

export function refreshOrganizations() {
	return (dispatch, getState) => {
		const appId = getState().app.id
		if (appId) {
			dispatch(requestedOrganizations())
			return GET(`apps/${appId}/organizations`)
					.then(function(json){
						dispatch(receivedOrganizations(json))
					}
				)
			}		
	}
}

