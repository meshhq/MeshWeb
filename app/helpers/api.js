
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

export function POST(path, params) {
	const url = URLWithPath(path, params)
	const request = baseRequest('POST', url)
	return executeRequest(request)
}

export function PUT(path, params) {
		const url = URLWithPath(path, params)
		const request = baseRequest('UPDATE', url)
		return executeRequest(request)
}

export function DELETE(path, params) {
	const url = URLWithPath(path, params)
	const request = baseRequest('DELETE', url)
	return executeRequest(request)
}

/**
 * Performs the Fetch for the given request
 * @param  {[type]} request Base Request
 * @return {[type]}         Result Proimise
 */
function performFetch(request) {
	return Fetch(request).then((response) => {
		if (response.ok) {
			return response.json()
		} else {
			return response.json().then((respJSON) => {
				// Look for 401s
				if (response.status == 401) {
					clearAuthToken()
				}
				return Promise.reject(respJSON)
			})
		}
	}, (error) => {
		return Promise.reject(error)
	})
}

/**
 * Performs the request for the given request
 * @param  {[type]} request Base Request
 * @return {[type]} Result Proimise
 */
function executeRequest(request) {
	return Fetch(request).then((response) => {
		if (response.ok) {
			return response.json()
		} else {
			return response.json().then((respJSON) => {
				// Look for 401s
				if (response.status == 401) {
					clearAuthToken()
				}
				return Promise.reject(respJSON)
			})
		}
	}, (error) => {
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
		const bearerHeader = 'Bearer ' + authHeader
		headers.set(AUTHORIZATION_HEADER_KEY, bearerHeader)
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
