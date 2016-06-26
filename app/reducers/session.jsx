
import { SUBMITTED_LOGIN, RECEIVED_CHALLENGE, LOGIN_SUCCESS } from '../actions/users'
import { REFRESHED_ME } from '../actions/session'

const defaultState = {
	isLoggingIn: false,
	challenge: false,
	hudMessage: '',
	user: null
}

function session(state = defaultState, action) {
	switch(action.type) {
		case SUBMITTED_LOGIN:
			return Object.assign({}, state, {
				isLoggingIn: true,
				challenge: false
			})
		case RECEIVED_CHALLENGE:
			return Object.assign({}, state, {
				isLoggingIn: false,
				challenge: true
			})
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isLoggingIn: false,
				challenge: false
			})
		case REFRESHED_ME:
			return Object.assign({}, state, {
				user: action.user
			})
		default:
			return state
	}
}

export default session;