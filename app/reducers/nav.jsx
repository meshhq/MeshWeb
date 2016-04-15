
import { CHANGE_NAV_SELECTION } from '../actions/nav'

function nav(state = 0, action) {
	switch(action.type) {
		case CHANGE_NAV_SELECTION:
			return action.idx;
		default:
			return state
	}
}

export default nav;
