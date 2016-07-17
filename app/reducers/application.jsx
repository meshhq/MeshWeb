
import { RESOLVED_APP_ID } from '../actions/application'

const defaultState = {
  id: '',
  token: ''
}

function app(state = defaultState, action) {
	switch(action.type) {
		case RESOLVED_APP_ID:
			return Object.assign({}, state, {
				id: action.id,
        token: action.token
			})
		default:
			return state
	}
}

export default app