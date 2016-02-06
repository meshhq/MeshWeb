
import { combineReducers } from 'redux'
import nav from './nav'
import users from './users'

const meshApp = combineReducers({
  nav,
  users
})

export default meshApp