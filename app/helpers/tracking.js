
// Tracking 
import Mixpanel from 'mixpanel-browser'

/**
 * Users
 */

// Users Page
export function trackVisitedUsers() {
	trackEvent('Visited Users')
}

// Clicked User Line
export function trackClickedUser(user) {
	trackEvent('Clicked User', user)
}

/**
 * Organizations
 */

// Organizations Page
export function trackVisitedOrganizations() {
	trackEvent('Visited Organizations')
}

// Clicked Organizations Line
export function trackClickedOrganization(org) {
	trackEvent('Visited Organization', org)
}

// Clicked User Line From Organization Slideout
export function trackVisitedAUserFromOrgPanel(org, user) {
	trackEvent('Visited User From Organization Panel', {
		org: org,
		user: user
	})
}

/**
 * Lists
 */

// Lists Page
export function trackVisitedLists() {
	trackEvent('Visited Lists')
}

/**
 * Providers
 */

// Providers Page
export function trackVisitedProviders() {
	trackEvent('Visited Providers')
}

// Clicked Live Provider Activiate
export function trackClickedActivateLiveProvider(pro) {
	trackEvent('Clicked Activiate Live Provider', pro)
}

// Clicked Inactive Provider
export function trackClickedInfoOnInactiveProvider(pro) {
	trackEvent('Clicked Info On Inactive Provider', pro)
}

/**
 * Login
 */

// Visited Sign In
export function trackVisitedLogin() {
	trackEvent('Visited Login')
}

// Successful Sign In
export function trackSuccessfulSignIn() {
	trackEvent('Successfully Signed In')
}

// Clicked Sign Up (User)
export function trackClickedSignUpUser() {
	trackEvent('Clicked Sign Up (User)')
}

// Visited Sign Up (Company)
export function trackClickedSignUpCompany() {
	trackEvent('Clicked Sign Up (Company)')
}

// Successful Sign Up
export function trackSuccessfulSignUp() {
	trackEvent('Successfully Signed Up')
}

/**
 * Session
 */

// Record User Info
export function identifyUser(user) {
	Mixpanel.register(user)
	Mixpanel.identify(user.id);
}

/**
 * Generalized Tracking Interface
 */

function trackEvent(eventTitle, extraInfo) {
	Mixpanel.track(eventTitle, extraInfo)
}