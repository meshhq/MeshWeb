
import { combineReducers } from 'redux'
import users from './users'
import app from './application'
import providers from './providers'
import lists from './lists'
import organizations from './organizations'
import integrations from './integrations'
import session from './session'

const meshApp = combineReducers({
	app,
  providers,
	integrations,
	users,
  lists,
  organizations,
  session
})

export default meshApp
