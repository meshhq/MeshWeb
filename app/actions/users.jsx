
import { GET, POST, PUT, DELETE } from '../helpers/api'
export const ADD_USER = 'ADD_USER'

// Network Calls
export function addUser(user) {
	return { type: ADD_USER, user }
}

export const ADDED_USER = 'ADDED_USER'
export function addedUser(json) {
	return {
		type: ADDED_USER,
		users: json,
		receivedAt: Date.now()
	}
}

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

export function addUser() {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(requestedUsers())
			const appID = getState().app.id
			const userID = getState().user.id
			return POST(`apps/${appID}/users/${userID}`)
			.then(function(json){
					dispatch(addedUser(json))
				}
			)
		}
	}
}
