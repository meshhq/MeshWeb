
import { GET, POST, PUT, DELETE } from '../helpers/api'


//------------------------------------------------------------------------------
// Create List
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const CREATING_LIST = 'CREATING_LIST'
export function creatingList() {
	return {
		type: CREATING_LIST
	}
}

// The action to indicate a list has been created.
export const CREATED_LIST = 'CREATED_LIST'
export function createdList() {
	return {
		type: CREATED_LIST
	}
}

export function createList(params) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(creatingList())
			const appID = getState().app.id
			return POST(`apps/${appID}/lists`, params)
			.then(function(json){
					dispatch(createdList(json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Updating List
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const UPDATING_LIST = 'UPDATING_LIST'
export function updatingList() {
	return {
		type: UPDATING_LIST
	}
}

// The action to indicate a list has been created.
export const UPDATED_LIST = 'UPDATED_LIST'
export function updatedList() {
	return {
		type: UPDATED_LIST
	}
}

export function updateList(listID, params) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(updatingList())
			const appID = getState().app.id
			return PUT(`apps/${appID}/lists/${listID}`, params)
			.then(function(json){
					dispatch(updatedList(json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Deleting List
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const DELETING_LIST = 'DELETING_LIST'
export function deletingList() {
	return {
		type: DELETING_LIST
	}
}

// The action to indicate a list has been created.
export const DELETED_LIST = 'DELETED_LIST'
export function deletedList() {
	return {
		type: DELETED_LIST
	}
}

export function deleteList(listID) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(deletingList())
			const appID = getState().app.id
			return DELETE(`apps/${appID}/lists/${listID}`)
			.then(function(json){
					dispatch(deletedList(json))
				}
			)
		}
	}
}


//------------------------------------------------------------------------------
// Refresh Lists
//------------------------------------------------------------------------------

// This action is to indicate the desired
// refresh of the list table
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
