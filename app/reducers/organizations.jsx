import { REFRESH_ORGANIZATION_LIST, REQUEST_ORGANIZATIONS, RECEIVE_ORGANIZATIONS } from '../actions/organizations'

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	organizations: []
}

function organizations(state = defaultState, action) {
	switch(action.type) {
		case REFRESH_ORGANIZATION_LIST:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case REQUEST_ORGANIZATIONS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: true
			})
		case RECEIVE_ORGANIZATIONS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				organizations: action.organizations,
				lastUpdated: action.ReceivedAt
			})
		default:
			return state
	}
}

export default organizations;