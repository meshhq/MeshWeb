
import { SUBMITTED_LOGIN, RECEIVED_CHALLENGE, LOGIN_SUCCESS } from '../actions/users'

const defaultState = {
	isLoggingIn: false,
	challenge: false,
	hudMessage: ''
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
		default:
			return state
	}
}

export default session;