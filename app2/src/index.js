import '@fortawesome/fontawesome'
import '@fortawesome/fontawesome-free-solid'
import '@fortawesome/fontawesome-free-regular'
import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import DefaultApp from './components/AppContainer'
import { configureStore } from './store'
import * as api from './api'
import * as selectors from './selectors'
import './index.css'

const store = configureStore(api, selectors)

function render(App) {
  ReactDOM.render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.getElementById('root'),
  )
}

if (module.hot) {
  module.hot.accept('./components/AppContainer', () => {
    // eslint-disable-next-line
    render(require('./components/AppContainer').default)
  })
}

render(DefaultApp)
