
import { BASE_URL } from '../constants/api'
import { Fetch, Headers, Request } from 'isomorphic-fetch'
import { getAuthToken, clearAuthToken } from './session'
import EventEmitter from './eventEmitter'
import URI from 'urijs'

const AUTHORIZATION_HEADER_KEY = 'Authorization'

// Notification name for a 401
export const UNAUTHORIZED_ACCESS_NOTIFICATION = 'UNAUTHORIZED_ACCESS_NOTIFICATION'

/**
 * INTERFACE METHODS
 */

export function GET(path, params) {
	const url = URLWithPath(path, params)
	const request = baseRequest('GET', url)
	return performFetch(request)
}

export function POST(path, params) {
	const url = URLWithPath(path)
	const request = baseRequest('POST', url, params)
	return performFetch(request)
}

export function PUT(path, params) {
		const url = URLWithPath(path, params)
		const request = baseRequest('PUT', url, params)
		return performFetch(request)
}

export function DELETE(path, params) {
	const url = URLWithPath(path, params)
	const request = baseRequest('DELETE', url)
	return performFetch(request)
}


/**
 * Performs the Fetch for the given request
 * @param  {[type]} request Base Request
 * @return {[type]}         Result Proimise
 */
function performFetch(request) {
	return Fetch(request).then((response) => {
		if (response.ok) {
			if (response.status === 204) {
				return null
			} else {
				return response.json()
			}
		} else {
			return response.json().then((respJSON) => {
				// Look for 401s
				if (response.status == 401) {
					clearAuthToken()
					EventEmitter.sharedEmitter().emit(UNAUTHORIZED_ACCESS_NOTIFICATION, true)
				}
				return Promise.reject(respJSON)
			})
		}
	}, () => Promise.reject())
}
/**
 * Creates the base request object for the operation
 * @param  {String} method HTTP Method
 * @param  {String} URL    URL For Req
 * @param  {Object} Body   Body for the request
 * @return {Request}       Formatted Request
 */
function baseRequest(method, url, body) {
	const headersForRequest = defaultHeaders()
	const init = {
		method: method,
		headers: headersForRequest,
		mode: 'cors',
		cache: 'default',
		body: JSON.stringify(body)
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
	const authHeader = getAuthToken()
	if (authHeader) {
		const bearerHeader = 'bearer ' + authHeader
		headers.set(AUTHORIZATION_HEADER_KEY, bearerHeader)
	}
}
