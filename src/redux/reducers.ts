import C from './types'
import { combineReducers } from 'redux'

const postsReducer = (
  state: Array<any> = [],
  action: any
) => {
  switch (action.type) {
    case C.REQUESTED_SUCCEEDED:
      return action.payload
    default:
        return state
  }
}

export const rootReducers = combineReducers({
  posts: postsReducer
})