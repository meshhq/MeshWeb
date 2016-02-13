
import { RESOLVED_APP_ID } from '../actions/application'

function app(state = {}, action) {
	switch(action.type) {
		case RESOLVED_APP_ID:
			return Object.assign({}, state, {
				id: action.id
			})
		default:
			return state
	}
}

export default app