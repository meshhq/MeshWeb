
import { combineReducers } from 'redux'
import nav from 'nav'
import users from 'users'

const todoApp = combineReducers({
  nav,
  users
})

export default todoApp