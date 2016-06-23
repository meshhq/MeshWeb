
import { Router, Route, IndexRedirect, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import Login from './containers/Login'
import { requireAuth } from './helpers/session'
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

// Configuring the app store
const store = configureStore()

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
      <Route component={Login} path="/login" />
    </Router>
  </Provider>,
  document.getElementById('root')
)
