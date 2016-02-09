import FakeObjectDataListStore from '../helpers/sampleUsers'
import { ADD_USER, REFRESH_USER_LIST, REQUEST_USERS, RECEIVE_USERS } from '../actions/users'

const seededDataList = new FakeObjectDataListStore(2000);

const defaultState = {
	isFetching: false,
	didInvalidate: false,
	users: []
}

function users(state = defaultState, action) {
	switch(action.type) {
		case ADD_USER:
			return Object.assign({}, state, {
				users: [
					...state,
					{
						firstName: action.firstName,
						lastName: action.lastName
					}
				]
			})
		case REFRESH_USER_LIST:
			return Object.assign({}, state, {
				didInvalidate: true
			})
		case REQUEST_USERS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: true
			})
		case RECEIVE_USERS:
			return Object.assign({}, state, {
				didInvalidate: false,
				isFetching: false,
				users: action.users,
				lastUpdated: action.ReceivedAt
			})
		default:
			return state
	}
}

export default users;