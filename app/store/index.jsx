
import { createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import raven from 'raven-js'
import rootReducer from '../reducers'

function ravenIntercept() {
  return (next) => (action) => {
    // Call the next dispatch method in the middleware chain.
    let returnValue
    try {
        returnValue = next(action)
    }
    catch(err) {
        raven.captureException(err)
    }

    // This will likely be the action itself, unless
    // a middleware further in chain changed it.
    return returnValue
  }
}

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    // Taking out the ravenIntercept
    applyMiddleware(ravenIntercept, thunk)
  )

  if (module.hot) {
    module.hot.accept('../reducers', () => {
      const nextReducer = require('../reducers')
      store.replaceReducer(nextReducer)
    })
  }

  return store
}
