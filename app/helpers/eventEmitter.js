
import { EventEmitter } from 'fbemitter'

// Holder for our singleton
let emitter = undefined

// Exporting the default emitter
export default {

	sharedEmitter: () => {
		if (emitter === undefined) {
			emitter = new EventEmitter()
		}
		return emitter		
	}
}