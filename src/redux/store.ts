import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducers } from './reducers'
import { rootSaga } from './sagas'
import initial from './initial'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION__?: typeof compose;
  }
}

const composeEnhancers: any = window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()

export const store = createStore(
  rootReducers,
  initial,
  compose(
    applyMiddleware(sagaMiddleware, logger),
    composeEnhancers
  ),
)

sagaMiddleware.run(rootSaga)