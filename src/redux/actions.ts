import C from './types'

// BEGIN GENERAL
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
// END GENERAL

// BEGIN AUTH
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
// END AUTH

// BEGIN FORWARDING REQUEST
export const setForwardingRequest = (forwardingRequest: any) => {
  return {
    type: C.SET_FORWARDING_REQUEST,
    payload: forwardingRequest
  }
}
// END FORWARDING REQUEST

// BEGIN FORWARDING NOTE
export const setNotes = (notes: any) => {
  return {
    type: C.SET_NOTES,
    payload: notes
  }
}
// END FORWARDING NOTE

// BEGIN FORM
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
// END FORM

// BEGIN HISTORY
export const addToHistory = (document: any) => {
  return {
    type: C.ADD_TO_HISTORY,
    payload: document
  }
}
// END HISTORY

// BEGIN TEMPLATE
export const setTemplates = (templates: any) => {
  return {
    type: C.SET_TEMPLATES,
    payload: templates
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
// END TEMPLATE