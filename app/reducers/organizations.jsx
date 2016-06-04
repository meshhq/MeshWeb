import { REFRESH_ORGANIZATION_LIST, REQUEST_ORGANIZATIONS, RECEIVE_ORGANIZATIONS } from '../actions/organizations'
import { CREATING_ORGANIZATION, CREATED_ORGANIZATION } from '../actions/organizations'
import { UPDATING_ORGANIZATION, UPDATED_ORGANIZATION } from '../actions/organizations'
import { DELETING_ORGANIZATION, DELETED_ORGANIZATION } from '../actions/organizations'
import { PUBLISHING_ORGANIZATION, PUBLISHED_ORGANIZATION } from '../actions/organizations'
import { FETCHING_ORGANIZATION_USERS, FETCHED_ORGANIZATION_USERS } from '../actions/organizations'

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	organizations: [],
	users: []
}

function organizations(state = defaultState, action) {
	let updatedOrganizations = state.organizations
	switch(action.type) {

		//--------------------------------------------------------------
		// Create Organization
		//--------------------------------------------------------------

		case CREATING_ORGANIZATION:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case CREATED_ORGANIZATION:
			updatedOrganizations.splice(0, 0, action.organization);
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				organizations: updatedOrganizations,
				lastUpdated: action.createdAt
			})

		//--------------------------------------------------------------
		// Update Organization
		//--------------------------------------------------------------

		case UPDATING_ORGANIZATION:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case UPDATED_ORGANIZATION:
			let updatedIdx = updatedOrganizations.indexOf(action.previousOrganization);
			for (let key in action.updatedOrganization) {
				action.previousOrganization[key] = action.updatedOrganization[key]
			}
			updatedOrganizations[updatedIdx] = action.previousOrganization
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				organizations: updatedOrganizations,
				lastUpdated: action.UpdatedAt
			})

		//--------------------------------------------------------------
		// Delete Users
		//--------------------------------------------------------------

		case DELETING_ORGANIZATION:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case DELETED_ORGANIZATION:
			let deletedIdx = updatedOrganizations.indexOf(action.deletedOrganization);
			updatedOrganizations.splice(deletedIdx, 1)
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				organizations: updatedOrganizations,
				lastUpdated: action.DeletedAt
			})

		//--------------------------------------------------------------
		// Publish Organization
		//--------------------------------------------------------------

		case PUBLISHING_ORGANIZATION:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case PUBLISHED_ORGANIZATION:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				lastUpdated: action.PublishedAt
			})

		//--------------------------------------------------------------
		// Refresh Organization
		//--------------------------------------------------------------

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

		//--------------------------------------------------------------
		// Fetching Organization Users
		//--------------------------------------------------------------

		case FETCHING_ORGANIZATION_USERS:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case FETCHED_ORGANIZATION_USERS:
		return Object.assign({}, state, {
			didInvalidate: false,
			isFetching: false,
			users: action.organizationUsers,
			lastUpdated: action.ReceivedAt
		})
		default:
			return state
	}
}

export default organizations;
