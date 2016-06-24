
import './bowerComponents/bootstrap/js/collapse.js'
import './bowerComponents/bootstrap/js/dropdown.js'
import './bowerComponents/bootstrap/js/modal.js'

// Vendor loads
import mixpanel from 'mixpanel-browser'

export default function RegisterVendorServices() {
	
	/**
	 * If in Demo, load up mixpanel
	 * 	 
	 */
	if (process.env.MODE == 'demo') {
		mixpanel.init('65eb9f9aa9524ab62fc9871ebc16f399')
	} else if (process.env.MODE == 'production') {
		mixpanel.init('004840a9aa88c30a6f333be2fa5b63cc')
	} else {
		mixpanel.init('fakeToken')
	}
}