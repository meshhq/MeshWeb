
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
export function createdUser(json) {
	return {
		type: CREATED_USER,
		user: json,
		createdAt: Date.now()
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
export function updatedUser(user, json) {
	return {
		type: UPDATED_USER,
		previousUser: user,
		updatedUser: json,
		updatedAt: Date.now()
	}
}

export function updateUser(user, params) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(updatingUser())
			const appID = getState().app.id
			return PUT(`apps/${appID}/users/${user.id}`, params)
			.then(function(){
					dispatch(updatedUser(user, params))
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
export function deletedUser(user) {
	return {
		type: DELETED_USER,
		deletedUser: user,
		deletedAt: Date.now()
	}
}

export function deleteUser(user) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(deletingUser())
			const appID = getState().app.id
			return DELETE(`apps/${appID}/users/${user.id}`)
			.then(function(){
					dispatch(deletedUser(user))
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
		type: PUBLISHED_USER,
		publishedAt: Date.now()
	}
}

export function publishUser(user, providers) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(publishingUser())
			const appID = getState().app.id
			let body = { 'destination_providers' : providers }
			return POST(`apps/${appID}/users/${user.id}/publish`, body)
			.then(function(json){
					dispatch(publishedUser(json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// GET User Lists
//------------------------------------------------------------------------------

// This action is to indicate a network request to publish a list has begun.
export const GETTING_USER_LISTS = 'GETTING_USER_LISTS'
export function gettingListsForUser() {
	return {
		type: GETTING_USER_LISTS
	}
}

// The action to indicate a list has been created.
export const RECEIVED_USER_LISTS = 'RECEIVED_USER_LISTS'
export function recievedListsForUser(json) {
	return {
		type: RECEIVED_USER_LISTS,
		lists: json
	}
}

export function getListsForUser(user) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(gettingListsForUser())
			const appID = getState().app.id
			return GET(`apps/${appID}/users/${user.id}/lists`)
			.then(function(json){
					dispatch(recievedListsForUser(json))
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
			return GET(`apps/${appId}/users`)
			.then(function(json){
					dispatch(receivedUsers(json))
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
export const REQUESTED_DETAIL_USER = 'REQUEST_DETAIL_USER'
export function requestedDetailUser(currentUser) {
	return {
		type: REQUESTED_DETAIL_USER,
		detailUser: currentUser
	}
}

// This function is to indicate that the
// network request action has begun
export const RECEIVED_DETAIL_USER_RESPONSE = 'RECEIVE_DETAIL_USER_RESPONSE'
export function receivedDetailUser(json) {
	return {
		type: RECEIVED_DETAIL_USER_RESPONSE,
		detailUser: json
	}
}

// requestDetailUser sends a request for the 
export function requestDetailUser(user) {
	return (dispatch, getState) => {
		dispatch(requestedDetailUser(user))
		if (getState().app.id) {
			const appId = getState().app.id
			return GET(`apps/${appId}/users/${user.id}/full`)
			.then(function(json){
					dispatch(receivedDetailUser(json))
				}
			)
		}
	}
}
