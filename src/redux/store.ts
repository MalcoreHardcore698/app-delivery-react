import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducers } from './reducers'
import { rootSaga } from './sagas'
import initial from './initial'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

export const store = createStore(
  rootReducers,
  initial,
  compose(
    applyMiddleware(sagaMiddleware, logger)
  ),
)

sagaMiddleware.run(rootSaga)