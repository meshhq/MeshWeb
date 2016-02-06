
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import configure from './store'

const store = configure()

// Style Sheets
import './assets/base_assets.scss'

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route
        component={App} 
        path="/" 
      />
    </Router>
  </Provider>,
  document.getElementById('root')
)


