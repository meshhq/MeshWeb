
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'

import { logger } from '../middleware'
import rootReducer from '../reducers'

export default function configure(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore
    
  const middleware = applyMiddleware(
    logger,
    thunk,
  )

  const store = create(rootReducer, initialState, middleware)

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
