
import { combineReducers } from 'redux'
import nav from './nav'
import users from './users'
import app from './application'
import providers from './providers'
import lists from './lists'
import organizations from './organizations'

const meshApp = combineReducers({
	app,
  nav,
  providers,
  users,
  lists,
  organizations
})

export default meshApp