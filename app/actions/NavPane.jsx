
export const CHANGE_NAV_PANE_SELECTION = 'CHANGE_NAV_PANE_SELECTION'

export function setNavPaneSelection(idx) {
	return { type: CHANGE_NAV_PANE_SELECTION, idx: idx }
}
