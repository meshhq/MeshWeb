
import { POST, GET } from '../helpers/api'
import { setAuthToken, clearAuthToken, logUserOut } from '../helpers/session'

// This action is to indicate the user
// attempted to login
export const SUBMITTED_LOGIN = 'SUBMITTED_LOGIN'
export function submitedLogin() {
	return {
		type: SUBMITTED_LOGIN
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
					dispatch(refreshMe())
					dispatch(loginSuccess())
					return Promise.resolve()
				}, (err) => {
					dispatch(receivedChallenge())
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
					dispatch(refreshMe())
					dispatch(loginSuccess())
					return Promise.resolve()
				}, (err) =>  {
					dispatch(receivedChallenge())
					Promise.reject(err)
				}
			)		
	}
}

/**
 * User / Me
 */
export const REFRESHED_ME = 'REFRESHED_ME'
export function refreshedMe(user) {
	return {
		type: REFRESHED_ME,
		user: user,
		receivedAt: Date.now()
	}
}

/**
* refreshMe refreshes the logged in user
* @return {[type]}       [description]
*/
export function refreshMe() {
	return (dispatch) => 
		GET('users/me')
		.then((response) => {
			dispatch(refreshedMe(response))
			return Promise.resolve()
		}, (err) => Promise.reject(err)
	)		

}
