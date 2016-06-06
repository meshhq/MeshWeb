
import { Router, Route, Redirect, browserHistory } from 'react-router'
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
import UserTable from './components/UserTable'
import OrganizationTable from './components/OrganizationTable'
import ListTable from './components/ListTable'
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
        <Route component={UserTable} path={'users'} />
        <Route component={OrganizationTable} path={'organizations'} />
        <Route component={ListTable} path={'lists'} />
        <Route component={Providers} path={'integrations'} />
        <Route onEnter={boundOAuthRegistration} path={'oauth/:provider'}>
          <Redirect from="/" to="/" />
        </Route>
      </Route>
      <Route component={Login} path="/login" />
    </Router>
  </Provider>,
  document.getElementById('root')
)
