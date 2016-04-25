
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import Login from './containers/Login'
import { requireAuth } from './helpers/session'
import configureStore from './store'

const store = configureStore()

// Style Sheets
import './assets/base_assets.scss'
import './assets/base_scripts'

// Render the component
ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App}
        onEnter={requireAuth}
        path="/"
      />
      <Route 
        component={Login}
        path="/login"
      />
    </Router>
  </Provider>,
  document.getElementById('root')
)
