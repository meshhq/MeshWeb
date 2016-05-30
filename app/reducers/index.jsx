
import { combineReducers } from 'redux'
import nav from './nav'
import users from './users'
import app from './application'
import providers from './providers'
import lists from './lists'
import organizations from './organizations'
import integrations from './integrations'

const meshApp = combineReducers({
	app,
  nav,
  providers,
	integrations,
	users,
  lists,
  organizations
})

export default meshApp
