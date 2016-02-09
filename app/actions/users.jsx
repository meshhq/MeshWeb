
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
export function refreshUserList(appId) {
	return {
		type: REFRESH_USER_LIST,
		appId
	}
}

// This function is to indicate that the 
// network request action has begun
export const REQUEST_USERS = 'REQUEST_USERS'
export function requestUsers(appId) {
	return {
		type: REQUEST_USERS,
		appId
	}
}

export const RECEIVE_USERS = 'RECEIVE_USERS'
export function receivedUsers(appId, json) {
	return {
		type: RECEIVE_USERS,
		appId,
		users: json,
		receivedAt: Date.now()
	}
}

// Thunk Network Call
export function getUsers() {

}
export function getUsers() {
	return (dispatch, getState) => {
		fetchFirstAppId(dispatch, getState)
	}
}

function fetchFirstAppId(dispatch, getState) {
	return fetch(URLWithPath('applications'))
		.then(function(response) {
			return response.json()
		}).then(function(json) {
			let appInfo = json[0]
			let appId = appInfo['production_id']
			fetchUsersWithAppId(dispatch, getState, appId)
		}
	)
}

function fetchUsersWithAppId(dispatch, getState, appId) {
	fetch(URLWithPath(`apps/${appId}/users`))
		.then(function(response){
			return response.json()
		}).then(function(json){
			dispatch(receivedUsers(appId, json))
		})
}

