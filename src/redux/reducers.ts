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
    case C.CLEAR_FORM:
      return null
    default:
      return state
  }
}

function historyReducer(state: any=[], action: any) {
  switch (action.type) {
    case C.ADD_TO_HISTORY:
      return [
        ...state,
        action.payload
      ]
    default:
      return state
  }
}

function templatesReducer(state: any=[], action: any) {
  switch (action.type) {
    case C.SET_TEMPLATES:
      return action.payload
    case C.SAVE_TEMPLATE:
      return [
        ...state,
        action.payload
      ]
    case C.DELETE_TEMPLATE:
      return state.filter((template: any) => template.number !== action.payload.number)
    default:
      return state
  }
}

export const rootReducers = combineReducers({
  user: userReducer,
  form: formReducer,
  history: historyReducer,
  templates: templatesReducer
})