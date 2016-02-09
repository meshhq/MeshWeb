
import fetch from 'isomorphic-fetch'
import {URLWithPath} from '../helpers/api'

export const ADD_USER = 'ADD_USER'

// Network Calls

export function addUser(user) {
	return { type: ADD_USER, user }
}

// This action is to indicate the desired
// refresh of the user table
export const REFRESH_USER_LIST = 'REFRESH_USER_LIST'
export function refreshUserList(app_id) {
	return {
		type: REFRESH_USER_LIST,
		app_id
	}
}

// This function is to indicate that the 
// network request action has begun
export const REQUEST_USERS = 'REQUEST_USERS'
export function requestUsers(app_id) {
	return {
		type: REQUEST_USERS,
		app_id
	}
}

export const RECEIVE_USERS = 'RECEIVE_USERS'
export function receivedUsers(app_id, json) {
	return {
		type: RECEIVE_USERS,
		app_id,
		users: json.data.children.map(child => child.data),
		receivedAt: Date.now()
	}
}

// Thunk Network Call
export function getUsers(app_id) {
	return (dispatch, getState) => {
		return fetch(URLWithPath('applications'))
			.then(function(response) {
				return response.json()
			}).then(function(json) {
				let appInfo = json[0]
				let appId = appInfo['production_id']
			}
		)
	}
}

