
import { NavStates, CHANGE_NAV_SELECTION } from '../actions/nav'

function nav(state = 0, action) {
	switch(state) {
		case CHANGE_NAV_SELECTION:
			return action.navState;
		default:
			return state
	}
}

export default nav;