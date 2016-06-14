
/**
 * IntegrationStateDescriptionForType returns the string
 * status indicator for the state type
 * @param {Number} stateType
 */
export function integrationStateDescriptionForType(stateType) {
	switch(stateType) {
		case 0:
			return 'NotActivated'
		case 1:
			return 'Activating'
		case 2:
			return 'Activating Users'
		case 3:
			return 'Activating Organizations'
		case 4:
			return 'Activating Transactions'
		case 5:
			return 'Activating Tickets'
		case 6:
			return 'Activating Lists'
		case 7:
			return 'Activated'
		case 8:
			return 'Activation Failed'
	}
	return 'Unknown'
}

export function integrationActivelySyncing(stateType) {
	switch(stateType) {
		case 0:
			return false
		case 7:
			return false
		case 8:
			return false
	}
	return true
}