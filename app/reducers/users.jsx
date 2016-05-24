
import { REFRESH_USER_LIST, REQUEST_USERS, RECEIVE_USERS, CREATED_USER, UPDATED_USER, DELETED_USER } from '../actions/users'

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	users: []
}

function users(state = defaultState, action) {
	let updatedUsers = state.users
	switch(action.type) {
		case CREATED_USER:
			updatedUsers.splice(0, 0, action.user);
			return Object.assign({}, state, {
				users: updatedUsers,
				lastUpdated: action.createdAt
			})
		case UPDATED_USER:
			let updatedIdx = updatedUsers.indexOf(action.previousUser);
			updatedUsers[updatedIdx] = action.updatedUser
			return Object.assign({}, state, {
				users: updatedUsers,
				lastUpdated: action.UpdatedAt
			})
		case DELETED_USER:
			let deletedIdx = updatedUsers.indexOf(action.deletedUser);
			updatedUsers.splice(deletedIdx, 1)
			return Object.assign({}, state, {
				users: updatedUsers,
				lastUpdated: action.DeletedAt
			})
		case REFRESH_USER_LIST:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case REQUEST_USERS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: true
			})
		case RECEIVE_USERS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				users: action.users,
				lastUpdated: action.ReceivedAt
			})
		default:
			return state
	}
}

export default users;