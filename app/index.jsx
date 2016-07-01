
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import Login from './containers/Login'
import { requireAuth, setupSessionEventListeners } from './helpers/session'
import configureStore from './store'

// Main Components
import Users from './components/Users'
import Organizations from './components/Organizations'
import Lists from './components/Lists'
import Providers from './components/Providers'

// Style Sheets
import RegisterVendorServices from './assets/base_scripts'
import './assets/base_assets.scss'

// Register Services
RegisterVendorServices()

// Register Auth Services
setupSessionEventListeners(browserHistory)

// Configuring the app store
const store = configureStore()

// Injecting signup param
const signUpLoginComponent = (children) => <Login startInSignupMode={true}>{children}</Login>

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
        <Route component={Providers} path={'oauth/:callbackProvider'} />
      </Route>
      <Route component={Login} path="/login"/>
      <Route component={signUpLoginComponent} path="/signup"/>
    </Router>
  </Provider>,
  document.getElementById('root')
)
