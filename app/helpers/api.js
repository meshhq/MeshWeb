
import { BASE_URL } from '../constants/api'
import { Fetch, Headers, Request } from 'isomorphic-fetch'
import URI from 'urijs'

const AUTHORIZATION_HEADER_KEY = 'Authorization'
const AUTHORIZATION_STOAGE_KEY = 'mesh_key'

/**
 * INTERFACE METHODS
 */

export function GET(path, params) {
	const url = URLWithPath(path, params)
	const request = baseRequest('GET', url)
	return performFetch(request)
}

// export function POST(path, params) {
// 	// TODO
// }

// export function PUT(path, params) {
// 	// TODO
// }

// export function DELETE(path, params) {
// 	// TODO
// }

/**
 * Performs the Fetch for the given request
 * @param  {[type]} request Base Request
 * @return {[type]}         Result Proimise
 */
function performFetch(request) {
	return Fetch(request).then((response) => {
		if (response.ok) {
			return response.json()
		} else if (response.status == 401) {
			console.log("auth error")
			return Promise.reject(response)
		} else {
			console.log("some error")
			return Promise.reject(response)
		}
	}, (error) => {
		console.log("some error")
		return Promise.reject(error)
	})
}

/**
 * Creates the base request object for the operation
 * @param  {String} method HTTP Method
 * @param  {String} URL    URL For Req
 * @return {Request}       Formatted Request
 */
function baseRequest(method, url) {
	const headersForRequest = defaultHeaders()
	const init = { 
		method: method,
		headers: headersForRequest,
		mode: 'cors',
		cache: 'default'
	}
	let req = new Request(url, init)
	return req
}

/**
 * URI For the requested path
 * @param  {String} path Path for the API
 * @return {String}        URI for the path
 */
function URLWithPath(path, queryParams = {}) {
	let uri = new URI(BASE_URL)
	uri.pathname(path)

	// Append Query Params
	for (const key in queryParams) {
		if (queryParams.hasOwnProperty(key)) {
			uri.setSearch(key, queryParams[key])
		}
	}

	return uri.toString()
}

/**
 * defaultHeaders supplies the default headers for an api request
 * @return {Headers} Default Headers
 */
function defaultHeaders() {
	const header = new Headers();
	header.set('Accept', 'application/json')
	header.set('Content-Type', 'application/json')
	appendAuthentication(header)
	return header
}


/**
 * AUTHENTICATION
 */

/**
 * Appends the necessary auth headers if we're logged in
 * @param  {Headers} headers
 */
function appendAuthentication(headers) {
	const authHeader = window.localStorage.getItem(AUTHORIZATION_STOAGE_KEY)
	if (authHeader) {
		headers.set(AUTHORIZATION_HEADER_KEY, authHeader)
	}
}

/**
 * Sets the Auth token for the app
 * @param {String} token
 */
function setAuthToken(token) {
	window.localStorage.setItem(AUTHORIZATION_STOAGE_KEY, token)
}

/**
 * Clears the auth token
 */
function clearAuthToken() {
	window.localStorage.setItem(AUTHORIZATION_STOAGE_KEY, null)
}

