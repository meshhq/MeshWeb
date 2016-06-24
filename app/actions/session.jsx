
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
				}, (err) => {
					clearAuthToken()
					return Promise.reject(err)
				}
			)		
	}
}

/**
 * submitSignUp signs the user up
 * @param  {string} email
 * @param  {string} pass 
 * @param  {string} firstName 
 * @param  {string} lastName
 * @param  {string} companyName
 * @param  {string} companySite
 */
export function submitSignUp(email, pass, firstName, lastName, companyName, companySite) {
	return (dispatch) => {
		dispatch(submitedLogin())

		const payload = {
			'user' : {
				'email' : email, 
				'password' : pass,				
				'first_name' : firstName,
				'last_name' : lastName
			},
			'organization' : {
				'name' : companyName,
				'website' : companySite				
			}
		}
		
		return POST('signup', payload)
				.then((response) => {
					setAuthToken(response.token)
					return Promise.resolve()
				}, (err) => Promise.reject(err)
			)		
	}
}
