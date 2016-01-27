
import { Router, Route, browserHistory } from 'react-router'
import { Provider } from 'react-redux'
import ReactDOM from 'react-dom'
import React from 'react'

import App from './containers/App'
import configure from './store'

const store = configure()

// Style Sheets
import Style from './assets/base_assets.scss'

// Style Sheets
import jquery from './assets/bower_components/jquery/dist/jquery.min.js'


ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
