
import { REFRESH_USER_LIST, REQUEST_USERS, RECEIVE_USERS, ADD_USER } from '../actions/users'

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	users: [{firstName: 'T$'}]
}

function users(state = defaultState, action) {
	switch(action.type) {
		case ADD_USER:
			return Object.assign({}, state, {
				users: [
					...state,
					{
						firstName: action.firstName,
						lastName: action.lastName
					}
				]
			})
		case REFRESH_USER_LIST:
			return Object.assing({}, state, {
				didInvalidate: true
			})
		case REQUEST_USERS:
			return Object.assing({}, state, {
				didInvalidate: false,
				isFetching: true
			})
		case RECEIVE_USERS:
			return Object.assing({}, state, {
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