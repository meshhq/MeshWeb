
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import Login from './containers/Login'
import { requireAuth } from './helpers/session'
import EventEmitter from './helpers/eventEmitter'
import { UNAUTHORIZED_ACCESS_NOTIFICATION } from './helpers/api'
import configureStore from './store'

const store = configureStore()

// Style Sheets
import './assets/base_assets.scss'
import './assets/base_scripts'

// Listen for 401s
EventEmitter.sharedEmitter().addListener(UNAUTHORIZED_ACCESS_NOTIFICATION, (unauthorized) => {
  if (unauthorized) {
    browserHistory.push('/login')
  }
})

// Render the component
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App} onEnter={requireAuth} path="/" />
      <Route component={Login} path="/login" />
      <Route component={App} path="*" />
    </Router>
  </Provider>,
  document.getElementById('root')
)
