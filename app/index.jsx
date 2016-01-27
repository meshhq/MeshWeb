
import { Provider } from 'react-redux'
import { Router, Route } from 'react-router'
import { createHistory } from 'history'
import { syncReduxAndRouter } from 'redux-simple-router'
import ReactDOM from 'react-dom'
import React from 'react'

// Style Sheets
import Style from './assets/base_assets.scss'

// Style Sheets
import jquery from './assets/bower_components/jquery/dist/jquery.min.js'

import App from './containers/App'
import configure from './store'

const store = configure()
const history = createHistory()

syncReduxAndRouter(history, store)

ReactDOM.render(
  <Provider store={store}>
    <Router history={history}>
      <Route path="/" component={App}>
      </Route>
    </Router>
  </Provider>,
  document.getElementById('root')
)
