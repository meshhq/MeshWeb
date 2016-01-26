
import { handleActions } from 'redux-actions'

const initialState = [{
  userData: {},
  id: 0
}]

export default handleActions({
  'add user' (state, action) {
    return [{
      id: state.reduce((maxId, user) => Math.max(user.id, maxId), -1) + 1,
      userData: action.payload
    }, ...state]
  },

  'delete user' (state, action) {
    return state.filter(user => user.id !== action.payload )
  },

  'edit user' (state, action) {
    return state.map(user => {
      return user.id === action.payload.id
        ? { ...user, userData: action.payload.userData }
        : user
    })
  }
}, initialState)
