
import { GET } from '../helpers/api'

// This action is to indicate the desired
// refresh of the user table
export const REFRESH_LISTS = 'REFRESH_LISTS'
export function refreshLists() {
	return {
		type: REFRESH_LISTS
	}
}

// This function is to indicate that the 
// network request action has begun
export const REQUEST_LISTS = 'REQUEST_LISTS'
export function requestedLists() {
	return {
		type: REQUEST_LISTS
	}
}

export const RECEIVE_LISTS = 'RECEIVED_LISTS'
export function receivedLists(json) {
	return {
		type: RECEIVE_LISTS,
		lists: json,
		receivedAt: Date.now()
	}
}

export function refreshLists() {
	return (dispatch, getState) => {
		const appId = getState().app.id
		if (appId) {
			dispatch(requestedLists())
			return GET(`apps/${appId}/lists`)
					.then(function(json){
						dispatch(receivedLists(json))
					}
				)
			}		
	}
}

