
import { SUBMITTED_LOGIN, RECEIVED_CHALLENGE, LOGIN_SUCCESS } from '../actions/session'
import { REFRESHED_ME } from '../actions/session'
import { identifyUser } from '../helpers/tracking'
import raven from 'raven-js'

const defaultState = {
	isLoading: false,
	challenge: false,
	hudMessage: '',
	user: null
}

function session(state = defaultState, action) {
	switch(action.type) {
		case SUBMITTED_LOGIN:
			return Object.assign({}, state, {
				isLoading: true,
				isLoggingIn: true,
				challenge: false
			})
		case RECEIVED_CHALLENGE:
			return Object.assign({}, state, {
				isLoading: false,
				isLoggingIn: false,
				challenge: true
			})
		case LOGIN_SUCCESS:
			return Object.assign({}, state, {
				isLoading: false,
				isLoggingIn: false,
				challenge: false
			})
		case REFRESHED_ME: {
			raven.setUserContext(action.user)
			identifyUser(action.user)
			return Object.assign({}, state, {
				isLoading: false,
				user: action.user
			})
		}
		default:
			return state
	}
}

export default session;