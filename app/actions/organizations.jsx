
import { GET, PUT, POST, DELETE } from '../helpers/api'

//------------------------------------------------------------------------------
// Create Organization
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const CREATING_ORGANIZATION = 'CREATING_ORGANIZATION'
export function creatingOrganization() {
	return {
		type: CREATING_ORGANIZATION
	}
}

// The action to indicate a list has been created.
export const CREATED_ORGANIZATION = 'CREATED_ORGANIZATION'
export function createdOrganization(json) {
	return {
		type: CREATED_ORGANIZATION,
		organization: json,
		createdAt: Date.now()
	}
}

export function createOrganization(params) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(creatingOrganization())
			const appID = getState().app.id
			return POST(`apps/${appID}/organizations`, params)
			.then(function(json){
					dispatch(createdOrganization(json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Updating Organization
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const UPDATING_ORGANIZATION = 'UPDATING_ORGANIZATION'
export function updatingOrganization() {
	return {
		type: UPDATING_ORGANIZATION
	}
}

// The action to indicate a list has been created.
export const UPDATED_ORGANIZATION = 'UPDATED_ORGANIZATION'
export function updatedOrganization(organization, json) {
	return {
		type: UPDATED_ORGANIZATION,
		previousOrganization: organization,
		updatedOrganization: json,
		updatedAt: Date.now()
	}
}

export function updateOrganization(organization, params) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(updatingOrganization())
			const appID = getState().app.id
			return PUT(`apps/${appID}/organizations/${organization.id}`, params)
			.then(function(json){
					dispatch(updatedOrganization(organization, json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Deleting Organization
//------------------------------------------------------------------------------

// This action is to indicate a network request to create a list has begun.
export const DELETING_ORGANIZATION = 'DELETING_ORGANIZATION'
export function deletingOrganization() {
	return {
		type: DELETING_ORGANIZATION
	}
}

// The action to indicate a list has been created.
export const DELETED_ORGANIZATION = 'DELETED_ORGANIZATION'
export function deletedOrganization(organization) {
	return {
		type: DELETED_ORGANIZATION,
		deletedOrganization: organization,
		deletedAt: Date.now()
	}
}

export function deleteOrganization(organization) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(deletingOrganization())
			const appID = getState().app.id
			return DELETE(`apps/${appID}/organizations/${organization.id}`)
			.then(function(){
					dispatch(deletedOrganization(organization))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Publish Organization
//------------------------------------------------------------------------------

// This action is to indicate a network request to publish a list has begun.
export const PUBLISHING_ORGANIZATION = 'PUBLISHING_ORGANIZATION'
export function publishingOrganization() {
	return {
		type: PUBLISHING_ORGANIZATION
	}
}

// The action to indicate a list has been created.
export const PUBLISHED_ORGANIZATION = 'PUBLISHED_ORGANIZATION'
export function publishedOrganization() {
	return {
		type: PUBLISHED_ORGANIZATION,
		publishedAt: Date.now()
	}
}

export function publishOrganization(organizationID, providers) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(publishingOrganization())
			const appID = getState().app.id
			let body = { 'destination_providers' : providers }
			return POST(`apps/${appID}/organizations/${organizationID}/publish`, body)
			.then(function(json){
					dispatch(createdOrganization(json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Fetch Organization Users
//------------------------------------------------------------------------------

// This action is to indicate a network request to publish a list has begun.
export const FETCHING_ORGANIZATION_USERS = 'FETCHING_ORGANIZATION_USERS'
export function fetchingOrganizationUsers() {
	return {
		type: FETCHING_ORGANIZATION_USERS
	}
}

// The action to indicate a list has been created.
export const FETCHED_ORGANIZATION_USERS = 'FETCHED_ORGANIZATION_USERS'
export function fetchedOrganizationUsers(json) {
	return {
		type: FETCHED_ORGANIZATION_USERS,
		organizationUsers: json,
		receivedAt: Date.now()
	}
}

export function fetchOrganizationUsers(organization) {
	return (dispatch, getState) => {
		if (getState().app.id) {
			dispatch(fetchingOrganizationUsers())
			const appID = getState().app.id
			return GET(`apps/${appID}/organizations/${organization.id}/users`)
			.then(function(json){
					dispatch(fetchedOrganizationUsers(json))
				}
			)
		}
	}
}

//------------------------------------------------------------------------------
// Refresh Organizations
//------------------------------------------------------------------------------

// This action is to indicate the desired
// refresh of the user table
export const REFRESH_ORGANIZATION_ORGANIZATION = 'REFRESH_ORGANIZATION_ORGANIZATION'
export function refreshProviderOrganization() {
	return {
		type: REFRESH_ORGANIZATION_ORGANIZATION
	}
}

// This function is to indicate that the
// network request action has begun
export const REQUEST_ORGANIZATIONS = 'REQUEST_ORGANIZATIONS'
export function requestedOrganizations() {
	return {
		type: REQUEST_ORGANIZATIONS
	}
}

export const RECEIVE_ORGANIZATIONS = 'RECEIVE_ORGANIZATIONS'
export function receivedOrganizations(json) {
	return {
		type: RECEIVE_ORGANIZATIONS,
		organizations: json,
		receivedAt: Date.now()
	}
}

export function refreshOrganizations() {
	return (dispatch, getState) => {
		const appId = getState().app.id
		if (appId) {
			dispatch(requestedOrganizations())
			return GET(`apps/${appId}/organizations`)
					.then(function(json){
						dispatch(receivedOrganizations(json))
					}
				)
			}
	}
}
