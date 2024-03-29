import React from 'react'
import ReactDOM from 'react-dom'
import { Provider } from 'react-redux'
import { ModalProvider } from 'react-modal-hook'
import App from './components/App'
import * as serviceWorker from './serviceWorker'
import { store } from './redux/store'

import 'react-datepicker/dist/react-datepicker.css'
import './index.css'

ReactDOM.render(
  <Provider store={store}>
    <ModalProvider>
      <App />
    </ModalProvider>
  </Provider>,
  document.getElementById('root')
)

serviceWorker.unregister()