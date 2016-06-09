
import { REFRESH_LISTS, REQUEST_LISTS, RECEIVE_LISTS } from '../actions/lists'
import { CREATING_LIST, CREATED_LIST } from '../actions/lists'
import { UPDATING_LIST, UPDATED_LIST } from '../actions/lists'
import { DELETING_LIST, DELETED_LIST } from '../actions/lists'
import { PUBLISHING_LIST, PUBLISHED_LIST } from '../actions/lists'
import { FETCHING_LIST_USERS, FETCHED_LIST_USERS } from '../actions/lists'

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	lists: [],
	hudMessage: null,
	users: []
}

function lists(state = defaultState, action) {
	let updatedLists = state.lists
	switch(action.type) {

		//--------------------------------------------------------------
		// Create List
		//--------------------------------------------------------------

		case CREATING_LIST:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case CREATED_LIST:
			updatedLists.splice(0, 0, action.organization);
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				lists: updatedLists,
				lastUpdated: action.createdAt
			})

		//--------------------------------------------------------------
		// Update List
		//--------------------------------------------------------------

		case UPDATING_LIST:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case UPDATED_LIST: {
			let updatedIdx = updatedLists.indexOf(action.previousList);
			for (let key in action.updatedList) {
				action.previousList[key] = action.updatedList[key]
			}
			updatedLists[updatedIdx] = action.previousList
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				lists: updatedLists,
				lastUpdated: action.UpdatedAt
			})			
		}

		//--------------------------------------------------------------
		// Delete List
		//--------------------------------------------------------------

		case DELETING_LIST:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case DELETED_LIST: {
			let deletedIdx = updatedLists.indexOf(action.deletedList);
			updatedLists.splice(deletedIdx, 1)
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				lists: updatedLists,
				lastUpdated: action.DeletedAt
			})
		}

		//--------------------------------------------------------------
		// Publish List
		//--------------------------------------------------------------

		case PUBLISHING_LIST:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case PUBLISHED_LIST:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				lastUpdated: action.PublishedAt
			})

		//--------------------------------------------------------------
		// Create List
		//--------------------------------------------------------------

		case REFRESH_LISTS:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case REQUEST_LISTS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: true
			})
		case RECEIVE_LISTS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				lists: action.lists,
				lastUpdated: action.ReceivedAt
			})

		//--------------------------------------------------------------
		// Fetching List Users
		//--------------------------------------------------------------

		case FETCHING_LIST_USERS:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case FETCHED_LIST_USERS:
		return Object.assign({}, state, {
			didInvalidate: false,
			isFetching: false,
			users: action.listUsers,
			lastUpdated: action.ReceivedAt
		})
		default:
			return state
	}
}

export default lists
