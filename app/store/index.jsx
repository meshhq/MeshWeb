
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import createLogger from 'redux-logger'
import rootReducer from '../reducers'

function logger({ getState }) {
  return (next) => (action) => {
    console.log('(Tay Debug) Attempt to dispatch:', action)
    console.log('(Tay Debug) State prior to dispatch:', getState())

    // Call the next dispatch method in the middleware chain.
    let returnValue = next(action)
    console.log('(Tay Debug) PostDispath. Result:', returnValue)
    console.log('(Tay Debug) PostDispath. Current State:', getState())

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

export default function configureStore(initialState) {
  const create = window.devToolsExtension
    ? window.devToolsExtension()(createStore)
    : createStore

  const store = create(
    rootReducer,
    initialState,
    // Taking out the logger
    applyMiddleware(logger, thunk),
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
