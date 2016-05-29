
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
export function createdList(json) {
	return {
		type: CREATED_LIST,
		list: json,
		createdAt: Date.now()
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
export function updatedList(list, json) {
	return {
		type: UPDATED_LIST,
		previousList: list,
		updatedList: json,
		updatedAt: Date.now()
	}
}

export function updateList(list, params) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(updatingList())
			const appID = getState().app.id
			return PUT(`apps/${appID}/lists/${list.id}`, params)
			.then(function(json){
					dispatch(updatedList(list, json))
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
export function deletedList(list) {
	return {
		type: DELETED_LIST,
		deletedList: list,
		deletedAt: Date.now()
	}
}

export function deleteList(list) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(deletingList())
			const appID = getState().app.id
			return DELETE(`apps/${appID}/lists/${list.id}`)
			.then(function(){
					dispatch(deletedList(list))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Publish List
//------------------------------------------------------------------------------

// This action is to indicate a network request to publish a list has begun.
export const PUBLISHING_LIST = 'PUBLISHING_LIST'
export function publishingList() {
	return {
		type: PUBLISHING_LIST
	}
}

// The action to indicate a list has been created.
export const PUBLISHED_LIST = 'PUBLISHED_LIST'
export function publishedList() {
	return {
		type: PUBLISHED_LIST
	}
}

export function publishList(listID, providers) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(publishingList())
			const appID = getState().app.id
			let body = { 'destination_providers' : providers }
			return POST(`apps/${appID}/lists/${listID}/publish`, body)
			.then(function(json){
					dispatch(createdList(json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Refresh List Users
//------------------------------------------------------------------------------

// This action is to indicate a network request to publish a list has begun.
export const REQUESTING_LIST_USERS = 'REQUESTING_LIST_USERS'
export function requestingListUsers() {
	return {
		type: REQUESTING_LIST_USERS
	}
}

// The action to indicate a list has been created.
export const RECEIVED_LIST_USERS = 'RECEIVED_LIST_USERS'
export function receivedListUsers(json) {
	return {
		type: RECEIVED_LIST_USERS,
		listUsers: json,
		receivedAt: Date.now()
	}
}

export function getListUsers(list) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(requestingListUsers())
			const appID = getState().app.id
			return GET(`apps/${appID}/lists/${list.id}/users`)
			.then(function(json){
					dispatch(receivedListUsers(json))
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
	if (!json) {
		json = []
	}
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
