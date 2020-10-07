import { createStore, compose, applyMiddleware } from 'redux'
import createSagaMiddleware from 'redux-saga'
import { rootReducers } from './reducers'
import { rootSaga } from './sagas'
import initial from './initial'
import logger from 'redux-logger'

const sagaMiddleware = createSagaMiddleware()

/*
 * If necessary enable ReduxDevTools
*/
/*
const composeEnhancer =
  (process.env.NODE_ENV !== 'production' &&
    window['__REDUX_DEVTOOLS_EXTENSION_COMPOSE__']) ||
  compose
*/

export const store = createStore(
  rootReducers,
  initial,
  compose(applyMiddleware(sagaMiddleware, logger))
)

sagaMiddleware.run(rootSaga)