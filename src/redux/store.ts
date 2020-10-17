import { createStore, compose, applyMiddleware } from 'redux'
import { rootReducers } from './reducers'
import initial from './initial'
import thunk from 'redux-thunk'
import logger from 'redux-logger'

export const store = createStore(
  rootReducers,
  initial,
  compose(
    applyMiddleware(thunk, logger)
  )
)