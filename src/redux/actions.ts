import C from './types'

// BEGIN GENERAL
export const requestError = () => {
  return {
    type: C.FETCHED_FAILURE
  }
}
// END GENERAL

// BEGIN AUTH
export const auth = () => {
  return {
    type: C.FETCHED_AUTH
  }
}

export const login = (form: any) => {
  return {
    type: C.FETCHED_LOGIN,
    payload: form
  }
}

export const logout = () => {
  return {
    type: C.FETCHED_LOGOUT
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
// END AUTH

// BEGIN FORWARDING REQUEST
export const setForwardingRequest = (forwardingRequest: any) => {
  return {
    type: C.SET_FORWARDING_REQUEST,
    payload: forwardingRequest
  }
}

export const forwardingRequest = () => {
  return {
    type: C.FETCHED_FORWARDING_REQUEST
  }
}

export const forwardingRequestCreate = (form: any) => {
  return {
    type: C.FETCHED_FORWARDING_REQUEST_CREATE,
    payload: form
  }
}

export const forwardingRequestTemplates = () => {
  return {
    type: C.FETCHED_FORWARDING_REQUEST_TEMPLATES
  }
}

export const forwardingRequestSaveTemplate = (form: any) => {
  return {
    type: C.FETCHED_FORWARDING_REQUEST_SAVE_TEMPLATE,
    payload: form
  }
}

export const forwardingRequestDeleteTemplate = (template: any) => {
  return {
    type: C.FETCHED_FORWARDING_REQUEST_DELETE_TEMPLATE,
    payload: template
  }
}
// END FORWARDING REQUEST

// BEGIN FORWARDING NOTE
export const forwardingNotes = () => {
  return {
    type: C.FETCHED_FORWARDING_NOTES
  }
}

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

export const setLoading = (value: boolean) => {
  return {
    type: C.SET_LOADING,
    payload: value
  }
}