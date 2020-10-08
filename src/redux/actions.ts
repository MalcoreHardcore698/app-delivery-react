import C from './types'

// BEGIN LOGIN
export const login = (form: any) => {
  return {
    type: C.FETCHED_LOGIN,
    payload: form
  }
}

export const loginSuccess = (user: any) => {
  return {
    type: C.LOGIN_SUCCESS,
    payload: user
  }
}

export const loginPending = () => {
  return {
    type: C.LOGIN_PENDING
  }
}
// END LOGIN

export const requestError = () => {
  return {
    type: C.FETCHED_FAILURE
  }
}