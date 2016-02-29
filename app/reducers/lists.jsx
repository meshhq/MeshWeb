
import { REFRESH_LISTS, REQUEST_LISTS, RECEIVE_LISTS } from '../actions/lists'

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	lists: []
}

function lists(state = defaultState, action) {
	switch(action.type) {
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
		default:
			return state
	}
}

export default lists