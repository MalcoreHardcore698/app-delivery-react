import C from './types'
import { combineReducers } from 'redux'

const userReducer = (
  state: object = {},
  action: any
) => {
  switch (action.type) {
    case C.LOGIN_SUCCESS:
      return action.payload
    default:
        return state
  }
}

export const rootReducers = combineReducers({
  user: userReducer
})