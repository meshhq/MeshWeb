
import { ADD_USER } from '../actions/users'

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

export default users;