
import './bowerComponents/bootstrap/js/collapse.js'
import './bowerComponents/bootstrap/js/dropdown.js'
import './bowerComponents/bootstrap/js/modal.js'
import './bowerComponents/bootstrap/js/tab.js'

// Vendor loads
import mixpanel from 'mixpanel-browser'
import raven from 'raven-js'

export default function RegisterVendorServices() {
	
	/**
	 * If in Demo, load up mixpanel
	 * 	 
	 */
	if (process.env.MODE == 'demo') {
		mixpanel.init('65eb9f9aa9524ab62fc9871ebc16f399')
		raven.config('https://3c7aced5b9e74f92b38b99c9395ef209@app.getsentry.com/85191').install()
	} else if (process.env.MODE == 'production') {
		mixpanel.init('004840a9aa88c30a6f333be2fa5b63cc')
		raven.config('https://9d838c3bc6f84fbca2e1fe3d37672068@app.getsentry.com/85189').install()
	} else {
		mixpanel.init('fakeToken')
	}
}