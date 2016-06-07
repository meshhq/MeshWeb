
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import Login from './containers/Login'
import { requireAuth } from './helpers/session'
import { registerOAuthCall } from './helpers/oauth'
import EventEmitter from './helpers/eventEmitter'
import { UNAUTHORIZED_ACCESS_NOTIFICATION } from './helpers/api'
import configureStore from './store'

// Main Components
import Users from './components/Users'
import Organizations from './components/Organizations'
import Lists from './components/Lists'
import Providers from './components/Providers'

const store = configureStore()

// Binding Dispatch To Reg Oauth
const boundOAuthRegistration = registerOAuthCall.bind(store)

// Style Sheets
import './assets/base_scripts'
import './assets/base_assets.scss'

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
      <Route component={App} onEnter={requireAuth} path={'/'} >
        <IndexRedirect to="/users" />
        <Route component={Users} path={'users'} />
        <Route component={Organizations} path={'organizations'} />
        <Route component={Lists} path={'lists'} />
        <Route component={Providers} path={'integrations'} />
        <Route onEnter={boundOAuthRegistration} path={'oauth/:provider'}>
        </Route>
      </Route>
      <Route component={Login} path="/login" />
    </Router>
  </Provider>,
  document.getElementById('root')
)
