
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

export default function configureStore(initialState) {
  // const create = window.devToolsExtension
  //   ? window.devToolsExtension()(createStore)
  //   : createStore
  
  const store = createStore(
    rootReducer,
    initialState,
    applyMiddleware(thunk, createLogger())
  )

  // if (module.hot) {
  //   module.hot.accept('../reducers', () => {
  //     const nextReducer = require('../reducers')
  //     store.replaceReducer(nextReducer)
  //   })
  // }

  return store
}
