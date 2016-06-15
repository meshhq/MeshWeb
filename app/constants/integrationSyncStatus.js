
/**
 * IntegrationStateDescriptionForType returns the string
 * status indicator for the state type
 * @param {Number} stateType
 */
export function integrationStateDescription(stateType) {
	switch(stateType) {
		case 0:
			return 'NotActivated'
		case 1:
			return 'Syncing'
		case 2:
			return 'Syncing Users'
		case 3:
			return 'Syncing Organizations'
		case 4:
			return 'Syncing Transactions'
		case 5:
			return 'Syncing Tickets'
		case 6:
			return 'Syncing Lists'
		case 7:
			return 'Synced'
		case 8:
			return 'Sync Failed'
	}
	return 'Unknown'
}

export function integrationIsSyncing(stateType) {
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