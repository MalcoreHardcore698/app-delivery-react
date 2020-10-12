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

export const setForm = (form: any) => {
  return {
    type: C.SET_FORM,
    payload: form
  }
}

export const clearForm = () => {
  return {
    type: C.CLEAR_FORM
  }
}

export const addToHistory = (document: any) => {
  return {
    type: C.ADD_TO_HISTORY,
    payload: document
  }
}

export const saveTemplate = (template: any) => {
  return {
    type: C.SAVE_TEMPLATE,
    payload: template
  }
}

export const deleteTemplate = (template: any) => {
  return {
    type: C.DELETE_TEMPLATE,
    payload: template
  }
}