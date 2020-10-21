import C from './types'

export const requestError = () => {
  return {
    type: C.FETCHED_FAILURE
  }
}

export const setLoading = (value: boolean) => {
  return {
    type: C.SET_LOADING,
    payload: value
  }
}

export const loginSuccess = (token: any) => {
  return {
    type: C.LOGIN_SUCCESS,
    payload: token
  }
}

export const logoutSuccess = () => {
  return {
    type: C.LOGOUT_SUCCESS
  }
}

export const setForwardingRequest = (forwardingRequest: any) => {
  return {
    type: C.SET_FORWARDING_REQUEST,
    payload: forwardingRequest
  }
}

export const setNotes = (notes: any) => {
  return {
    type: C.SET_NOTES,
    payload: notes
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

export const setTemplates = (templates: any) => {
  return {
    type: C.SET_TEMPLATES,
    payload: templates
  }
}