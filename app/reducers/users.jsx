
import { REFRESH_USER_LIST, REQUEST_USERS, RECEIVE_USERS } from '../actions/users'
import { CREATING_USER, CREATED_USER } from '../actions/users'
import { UPDATING_USER, UPDATED_USER } from '../actions/users'
import { DELETING_USER, DELETED_USER } from '../actions/users'
import { PUBLISHING_USER, PUBLISHED_USER } from '../actions/users'
import { REQUESTED_DETAIL_USER, RECEIVED_DETAIL_USER_RESPONSE } from '../actions/users'

const defaultState = {
	detailUser: null,
	didInvalidate: false,
	hudMessage: '',
	isFetchingAll: false,
	isFetchingDetail: false,
	users: []
}

function users(state = defaultState, action) {
	let updatedUsers = state.users
	switch(action.type) {

		//--------------------------------------------------------------
		// Create User
		//--------------------------------------------------------------

		case CREATING_USER:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case CREATED_USER:
			updatedUsers.splice(0, 0, action.user);
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetchingAll: false,
				users: updatedUsers,
				lastUpdated: action.createdAt
			})

		//--------------------------------------------------------------
		// Update User
		//--------------------------------------------------------------

		case UPDATING_USER:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case UPDATED_USER: {
			let updatedIdx = updatedUsers.indexOf(action.previousUser);
			for (let key in action.updatedUser) {
				action.previousUser[key] = action.updatedUser[key]
			}
			updatedUsers[updatedIdx] = action.previousUser
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetchingAll: false,
				users: updatedUsers,
				lastUpdated: action.UpdatedAt
			})
		}

		//--------------------------------------------------------------
		// Delete User
		//--------------------------------------------------------------

		case DELETING_USER:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case DELETED_USER: {
			let deletedIdx = updatedUsers.indexOf(action.deletedUser);
			updatedUsers.splice(deletedIdx, 1)
			return Object.assign({}, state, {
				users: updatedUsers,
				lastUpdated: action.DeletedAt
			})
		}

		//--------------------------------------------------------------
		// Publish  User
		//--------------------------------------------------------------

		case PUBLISHING_USER:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case PUBLISHED_USER:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetchingAll: false,
				lastUpdated: action.PublishedAt
			})

		//--------------------------------------------------------------
		// Refresh Users
		//--------------------------------------------------------------

		case REFRESH_USER_LIST:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case REQUEST_USERS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetchingAll: true
			})
		case RECEIVE_USERS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetchingAll: false,
				users: action.users,
				lastUpdated: action.ReceivedAt
			})

		//--------------------------------------------------------------
		// Get Detail User
		//--------------------------------------------------------------

		case REQUESTED_DETAIL_USER:
			return Object.assign({}, state, {
				isFetchingDetail: true
			})
		case RECEIVED_DETAIL_USER_RESPONSE: {
			return Object.assign({}, state, {
				isFetchingDetail: false,
				detailUser: action.detailUser
			})
		}

		default:
			return state
	}
}

export default users;
