
import { GET, setAuthToken } from '../helpers/api'
import { refreshUsers } from './users'
import { refreshProviders } from './providers'
import { refreshLists } from './lists'

// This action is to indicate the desired
// refresh of the user table
export const RESOLVED_APP_ID = 'RESOLVED_APP_ID'
export function resolvedAppId(appId) {
	return {
		type: RESOLVED_APP_ID,
		id: appId
	}
}

function shouldFetchAppId(state) {
	if (state.app.appId == null) {
		return true
	}
	return false
}

function fetchFirstAppId(dispatch) {
	return GET('applications').then(function(json) {
			let appInfo = json[0]
			let appId = appInfo['application_id']
			let auth_token = appInfo['application_secret']
			setAuthToken(auth_token)
			dispatch(resolvedAppId(appId))
			
			// After a app id is resolved, dispatch refreshes of all
			// user, providers, etc
			const userFetchPromise = dispatch(refreshUsers())
			const providerFetchPromise = dispatch(refreshProviders())
			const listsFetchPromise = dispatch(refreshLists())
			return Promise.all([userFetchPromise, providerFetchPromise, listsFetchPromise])
		}
	)
}

export function fetchAppIdIfNeeded() {
	return (dispatch, getState) => {
		if (shouldFetchAppId(getState())) {
			return fetchFirstAppId(dispatch, getState)
		} else {
			return Promise.resolve();
		}
	}
}
