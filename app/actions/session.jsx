
import { POST } from '../helpers/api'
import { setAuthToken, clearAuthToken } from '../helpers/session'

// This action is to indicate the user
// attempted to login
export const SUBMITED_LOGIN = 'SUBMITED_LOGIN'
export function submitedLogin() {
	return {
		type: SUBMITED_LOGIN
	}
}

export const RECEIVED_CHALLENGE = 'RECEIVED_CHALLENGE'
export function receivedChallenge() {
	return {
		type: RECEIVED_CHALLENGE,
		receivedAt: Date.now()
	}
}

export const LOGIN_SUCCESS = 'LOGIN_SUCCESS'
export function loginSuccess() {
	return {
		type: LOGIN_SUCCESS,
		receivedAt: Date.now()
	}
}

/**
 * submitLogin attempts to log the user into the app
 * @param  {[type]} email [description]
 * @param  {[type]} pass  [description]
 * @return {[type]}       [description]
 */
export function submitLogin(email, pass) {
	return (dispatch) => {
		dispatch(submitedLogin())
		const payload = { 'email' : email, 'password' : pass }
		return POST('signin', payload)
				.then((response) => {
					setAuthToken(response.token)
					return Promise.resolve()
				}, () => {
					clearAuthToken()
					return Promise.reject()
				}
			)		
	}
}

