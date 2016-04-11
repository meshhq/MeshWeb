
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import configureStore from './store'

const store = configureStore()

// Style Sheets
import './assets/base_assets.scss'
import './assets/base_scripts'

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route component={App} path="/" />
    </Router>
  </Provider>,
  document.getElementById('root')
)
