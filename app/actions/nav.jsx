
export const CHANGE_NAV_SELECTION = 'CHANGE_NAV_SELECTION'

export function setNavSelection(idx) {
	return { type: CHANGE_NAV_SELECTION, idx: idx }
}