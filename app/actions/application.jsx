
import { GET } from '../helpers/api'
import { refreshUsers } from './users'
import { refreshProviders } from './providers'

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
			console.log(json)	
			let appInfo = json[0]
			let appId = appInfo['production_id']
			dispatch(resolvedAppId(appId))

			// After a app id is resolved, dispatch refreshes of all
			// user, providers, etc
			const userFetchPromise = dispatch(refreshUsers())
			const providerFetchPromise = dispatch(refreshProviders())
			return Promise.all([userFetchPromise, providerFetchPromise])
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
