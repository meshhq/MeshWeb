
import { registerOAuthCodeWithMesh } from '../actions/providers'

/**
 * RequireAuth wraps a React Component and intercepts
 * a routing to it. If the app is not authenticated, it
 * forces a redirect while keeping memory of the locaton
 * that the user tried to visit.
 * @return {React.Component} wrapped component
 */
export function registerOAuthCall(nextState) {
	const dispatch = this.dispatch
	const provider = nextState.params.provider
	const authCode = nextState.location.query.code
	
	// Launch Oauth Auth
	if (provider.length > 0 && authCode.length > 0) {
		const uri_dec = decodeURIComponent(authCode);
		dispatch(registerOAuthCodeWithMesh(provider, uri_dec))
	}
}