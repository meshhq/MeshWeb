
import { combineReducers } from 'redux'
import { ADD_USER } from '../actions/users'
import { NavStates, CHANGE_NAV_SELECTION } from '../actions/nav'

const initialState = {
	navState: NavStates.USERS,
	users: []
}

function nav(state = NavStates.USERS, action) {
	switch(state) {
		case CHANGE_NAV_SELECTION:
			return action.navState;
		default:
			return state
	}
}

function users(state = [], action) {
	switch(action.type) {
		case ADD_USER:
			return [
				...state,
				{
					firstName: action.firstName,
					lastName: action.lastName
				}
			]
		default:
			return state
	}
}

const todoApp = combineReducers({
  nav,
  users
})

export default todoApp