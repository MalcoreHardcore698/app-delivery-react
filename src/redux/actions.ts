import C from './types'
import { apiHost } from '../utils/config'

// BEGIN GENERAL
export const requestError = () => {
  return {
    type: C.FETCHED_FAILURE
  }
}
// END GENERAL

// BEGIN AUTH
export const auth = () => {
  return async (dispatch: any) => {
    return await fetch(`${apiHost}/account/login`)
      .then((res) => res.json())
      .then((data) => dispatch(loginSuccess(data)))
      .catch(() => dispatch(requestError()))
  }
}

export const login = (form: any) => {
  const formData: any = new FormData()
  formData.append('tin', form.tin)
  formData.append('password', form.passwrod)

  return async (dispatch: any) => {
    return await fetch(`${apiHost}/account/login?tin=${form.tin}&password=${form.password}`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        body: JSON.stringify(form)
      })
      .then((res) => res.json())
      .then((data) => dispatch(loginSuccess(data)))
      .catch(() => dispatch(requestError()))
  }
}

export const logout = () => {
  return async (dispatch: any) => {
    return await fetch(`${apiHost}/account/logout`, {
        method: 'POST'
      })
      .then((res) => res.json())
      .then(() => dispatch(logoutSuccess()))
      .catch(() => dispatch(requestError()))
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
  return async (dispatch: any) => {
    return await fetch(`${apiHost}/forwardingrequest/create`)
      .then((res) => res.json())
      .then((data) => dispatch(setForwardingRequest(data)))
      .catch(() => dispatch(requestError()))
  }
}

export const forwardingRequestCreate = (form: any) => {
  const document: any = {
    sender: form.sender,
    reciever: form.reciever,
    freightPieces: form.places,
    ...form.services.map((service: any) => ({
      [service.value]: true
    }))
  }

  return async (dispatch: any) => {
    return await fetch(`${apiHost}/forwardingrequest/sveastemplate`, {
        method: 'POST',
        body: JSON.stringify(document)
      })
      .then((res) => res.json())
      .then((data) => dispatch(addToHistory(data)))
      .catch(() => dispatch(requestError()))
  }
}

export const forwardingRequestTemplates = () => {
  return async (dispatch: any) => {
    return await fetch(`${apiHost}/forwardingrequest/templateindex`)
      .then((res) => res.json())
      .then((data) => dispatch(setTemplates(data)))
      .catch(() => dispatch(requestError()))
  }
}

export const forwardingRequestSaveTemplate = (template: any) => {
  return async (dispatch: any) => {
    return await fetch(`${apiHost}/forwardingrequest/sveastemplate`, {
        method: 'POST',
        body: JSON.stringify(template)
      })
      .then((res) => res.json())
      .then((data) => dispatch(saveTemplate(data)))
      .catch(() => dispatch(requestError()))
  }
}

export const forwardingRequestDeleteTemplate = (template: any) => {
  return async (dispatch: any) => {
    return await fetch(`${apiHost}/forwardingrequest/deletetemplateconfirmed`, {
        method: 'POST',
        body: JSON.stringify(template)
      })
      .then((res) => res.json())
      .then((data) => dispatch(deleteTemplate(data)))
      .catch(() => dispatch(requestError()))
  }
}
// END FORWARDING REQUEST

// BEGIN FORWARDING NOTE
export const forwardingNotes = () => {
  return async (dispatch: any) => {
    return await fetch(`${apiHost}/forwardingnote`)
      .then((res) => res.json())
      .then((data) => dispatch(setNotes(data)))
      .catch(() => dispatch(requestError()))
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