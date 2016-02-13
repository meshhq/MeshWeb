
import { combineReducers } from 'redux'
import nav from './nav'
import users from './users'
import app from './application'
import providers from './providers'

const meshApp = combineReducers({
	app,
  nav,
  providers,
  users
})

export default meshApp