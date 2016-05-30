
import { CREATED_LIST, UPDATED_LIST, REFRESH_LISTS, DELETED_LIST, PUBLISHED_LIST, REQUEST_LISTS, RECEIVE_LISTS, RECEIVED_LIST_USERS } from '../actions/lists'

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	lists: []
}

function lists(state = defaultState, action) {
	let updatedLists = state.lists
	switch(action.type) {
		case CREATED_LIST:
			updatedLists.splice(0, 0, action.organization);
			return Object.assign({}, state, {
				lists: updatedLists,
				lastUpdated: action.createdAt
			})
		case UPDATED_LIST:
			let updatedIdx = updatedLists.indexOf(action.previousList);
			updatedLists[updatedIdx] = action.updatedList
			return Object.assign({}, state, {
				lists: updatedLists,
				lastUpdated: action.UpdatedAt
			})
		case DELETED_LIST:
			let deletedIdx = updatedLists.indexOf(action.deletedList);
			updatedLists.splice(deletedIdx, 1)
			return Object.assign({}, state, {
				lists: updatedLists,
				lastUpdated: action.DeletedAt
			})
		case PUBLISHED_LIST:
			return Object.assign({}, state, {})
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
		case RECEIVED_LIST_USERS:
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
