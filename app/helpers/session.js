
// Session Token Key
const AUTHORIZATION_STOAGE_KEY = 'mesh_key'

/**
 * RequireAuth wraps a React Component and intercepts
 * a routing to it. If the app is not authenticated, it
 * forces a redirect while keeping memory of the locaton
 * that the user tried to visit.
 * @return {React.Component} wrapped component
 */
export function requireAuth(nextState, replace) {
	if (!userIsLoggedIn()) {
		replace({
			pathname: '/login',
			state: { nextPathname: nextState.location.pathname }			
		})
	}
}

/**
 * Sets the Auth token for the app
 * @param {String} token
 */
export function setAuthToken(token) {
	window.localStorage.setItem(AUTHORIZATION_STOAGE_KEY, token)
}

/**
 * Clears the auth token
 */
export function clearAuthToken() {
	window.localStorage.setItem(AUTHORIZATION_STOAGE_KEY, null)
}

/**
 * Returns the auth token
 * NOTE: Hard coding the dev token `testtoken` for dev env
 * @param {String} token
 */
export function getAuthToken() {
	// If in DEV, return the static test token
	if (process.env.ORIGIN == 'dev') {
		return 'testtoken'
	}

	// Look in window storage for it
	const val = window.localStorage.getItem(AUTHORIZATION_STOAGE_KEY)
	if (val === 'null') {
		return null
	}
	return val
}

/**
 * Returns whether the app believes we have a session
 * @param {String} token
 */
export function userIsLoggedIn() {
	const token = getAuthToken()
	return token !== undefined && token !== null && token !== 'null' && token.length > 0
}
