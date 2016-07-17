
import { GET } from '../helpers/api'
import { refreshUsers } from './users'
import { refreshProviders } from './providers'
import { refreshLists } from './lists'
import { refreshOrganizations } from './organizations'
import { refreshIntegrations } from './integrations'
import { refreshMe } from './session'

// This action is to indicate the desired
// refresh of the user table
export const RESOLVED_APP_ID = 'RESOLVED_APP_ID'
export function resolvedAppIdAndToken(appId, token) {
	return {
		type: RESOLVED_APP_ID,
		token: token,
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
			let appId = appInfo['id']
			const appAuthToken = appInfo['token']
			console.log(appInfo)
			dispatch(resolvedAppIdAndToken(appId, appAuthToken))
			dispatch(refreshMe())

			// After a app id is resolved, dispatch refreshes of all
			// user, providers, etc
			const userFetchPromise = dispatch(refreshUsers())
			const providerFetchPromise = dispatch(refreshProviders())
			const listsFetchPromise = dispatch(refreshLists())
			const orgFetchPromise = dispatch(refreshOrganizations())
			const integrationsFetchPromise = dispatch(refreshIntegrations())
			return Promise.all([
				userFetchPromise, 
				providerFetchPromise, 
				listsFetchPromise, 
				orgFetchPromise, 
				integrationsFetchPromise]
			)
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
