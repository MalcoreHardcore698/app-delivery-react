import C from './types'
import { combineReducers } from 'redux'

function userReducer(state: object = {}, action: any) {
  switch (action.type) {
    case C.LOGIN_SUCCESS:
      return action.payload
    default:
      return state
  }
}

function formReducer(state: object={}, action: any) {
  switch (action.type) {
    case C.SET_FORM:
      return {
        ...state,
        ...action.payload
      }
    default:
      return state
  }
}

export const rootReducers = combineReducers({
  user: userReducer,
  form: formReducer
})