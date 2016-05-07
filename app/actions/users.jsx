
import { GET, PUT, POST, DELETE } from '../helpers/api'

//------------------------------------------------------------------------------
// Create User
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const CREATING_USER = 'CREATING_USER'
export function creatingUser() {
	return {
		type: CREATING_USER
	}
}

// The action to indicate a list has been created.
export const CREATED_USER = 'CREATED_USER'
export function createdUser() {
	return {
		type: CREATED_USER
	}
}

export function createUser(params) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(creatingUser())
			const appID = getState().app.id
			return POST(`apps/${appID}/users`, params)
			.then(function(json){
					dispatch(createdUser(json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Updating User
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const UPDATING_USER = 'UPDATING_USER'
export function updatingUser() {
	return {
		type: UPDATING_USER
	}
}

// The action to indicate a list has been created.
export const UPDATED_USER = 'UPDATED_USER'
export function updatedUser() {
	return {
		type: UPDATED_USER
	}
}

export function updateUser(userID, params) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(updatingUser())
			const appID = getState().app.id
			return PUT(`apps/${appID}/users/${userID}`, params)
			.then(function(json){
					dispatch(updatedUser(json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Deleting User
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const DELETING_USER = 'DELETING_USER'
export function deletingUser() {
	return {
		type: DELETING_USER
	}
}

// The action to indicate a list has been created.
export const DELETED_USER = 'DELETED_USER'
export function deletedUser() {
	return {
		type: DELETED_USER
	}
}

export function deleteUser(userID) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(deletingUser())
			const appID = getState().app.id
			return DELETE(`apps/${appID}/users/${userID}`)
			.then(function(){
					dispatch(deletedUser())
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Publish User
//------------------------------------------------------------------------------

// This action is to indicate a network request to publish a list has begun.
export const PUBLISHING_USER = 'PUBLISHING_USER'
export function publishingUser() {
	return {
		type: PUBLISHING_USER
	}
}

// The action to indicate a list has been created.
export const PUBLISHED_USER = 'PUBLISHED_USER'
export function publishedUser() {
	return {
		type: PUBLISHED_USER
	}
}

export function publishUser(userID, providers) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(publishingUser())
			const appID = getState().app.id
			let body = { 'destination_providers' : providers }
			return POST(`apps/${appID}/users/${userID}/publish`, body)
			.then(function(json){
					dispatch(createdUser(json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Refresh Users
//------------------------------------------------------------------------------

// This action is to indicate the desired
// refresh of the user table
export const REFRESH_USER_LIST = 'REFRESH_USER_LIST'
export function refreshUserList() {
	return {
		type: REFRESH_USER_LIST
	}
}

// This function is to indicate that the
// network request action has begun
export const REQUEST_USERS = 'REQUEST_USERS'
export function requestedUsers() {
	return {
		type: REQUEST_USERS
	}
}

export const RECEIVE_USERS = 'RECEIVE_USERS'
export function receivedUsers(json) {
	return {
		type: RECEIVE_USERS,
		users: json,
		receivedAt: Date.now()
	}
}

export function refreshUsers() {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(requestedUsers())
			const appId = getState().app.id
			return GET(`apps/${appId}/users`, { limit: 35 })
			.then(function(json){
					dispatch(receivedUsers(json))
				}
			)
		}
	}
}
