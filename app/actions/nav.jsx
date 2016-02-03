
import { createAction } from 'redux-actions'

export const CHANGE_NAV_SELECTION = 'CHANGE_NAV_SELECTION'

export const NavStates = {
	USERS: 'users',
	INTEGRATIONS: 'integrations'
}

export function setNavSelections(selection) {
	return { type: CHANGE_NAV_SELECTION, selection }
}