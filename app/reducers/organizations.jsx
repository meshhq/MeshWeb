import { CREATED_ORGANIZATION, UPDATED_ORGANIZATION, DELETED_ORGANIZATION, REFRESH_ORGANIZATION_LIST, REQUEST_ORGANIZATIONS, RECEIVE_ORGANIZATIONS, PUBLISHED_ORGANIZATION } from '../actions/organizations'

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	organizations: []
}

function organizations(state = defaultState, action) {
	let updatedOrganizations = state.organizations
	switch(action.type) {
		case CREATED_ORGANIZATION:
			updatedOrganizations.splice(0, 0, action.organization);
			return Object.assign({}, state, {
				organizations: updatedOrganizations,
				lastUpdated: action.createdAt
			})
		case UPDATED_ORGANIZATION:
			let updatedIdx = updatedOrganizations.indexOf(action.previousOrganization);
			updatedOrganizations[updatedIdx] = action.updatedOrganization
			return Object.assign({}, state, {
				organizations: updatedOrganizations,
				lastUpdated: action.UpdatedAt
			})
		case DELETED_ORGANIZATION:
			let deletedIdx = updatedOrganizations.indexOf(action.deletedOrganization);
			updatedOrganizations.splice(deletedIdx, 1)
			return Object.assign({}, state, {
				organizations: updatedOrganizations,
				lastUpdated: action.DeletedAt
			})
		case PUBLISHED_ORGANIZATION:
			return Object.assign({}, state, {})
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
