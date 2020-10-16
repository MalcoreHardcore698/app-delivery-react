import C from './types'
import { all, put, call, takeEvery } from 'redux-saga/effects'
import {
  loginSuccess,
  logoutSuccess,
  requestError,
  setForwardingRequest,
  addToHistory,
  setTemplates,
  saveTemplate,
  deleteTemplate,
  setLoading,
  setNotes
} from './actions'
import { request } from '../utils/functions'
import { apiHost } from '../utils/config'

export function* fetchLoginAsync(action: any) {
  const form: any = new FormData()
  form.append('tin', action.payload.tin)
  form.append('password', action.payload.passwrod)

  try {
    const data = yield call(async () =>
      await request(`${apiHost}/account/login?tin=${action.payload.tin}&password=${action.payload.password}`, 'POST', form, {
        'Content-Type': 'application/x-www-form-urlencoded'
      })
    )
    yield put(loginSuccess(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchAuthAsync() {
  try {
    const data = yield call(async () =>
      await request(`${apiHost}/account/login`)
    )
    console.log('ID:', data)
    yield put(loginSuccess(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchLogoutAsync() {
  try {
    yield call(async () =>
      await request(`${apiHost}/account/logout`, 'POST')
    )
    yield put(logoutSuccess())
  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchForwardingRequestCreateAsync(action: any) {
  const form: any = {
    sender: action.payload.sender,
    reciever: action.payload.reciever,
    freightPieces: action.payload.places,
    ...action.payload.services.map((service: any) => ({
      [service.value]: true
    }))
  }

  yield put(setLoading(true))

  try {
    const data = yield call(async () =>
      await request(`${apiHost}/forwardingrequest/create`, 'POST', form)
    )
    yield put(addToHistory(data))
  } catch (error) {
    yield put(requestError())
  }

  yield put(setLoading(false))
}

export function* fetchForwardingRequestTemplatesAsync() {
  try {
    const data = yield call(async () =>
      await request(`${apiHost}/forwardingrequest/templateindex`)
    )
    yield put(setTemplates(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchForwardingRequestSaveTemplateAsync(action: any) {
  const form: any = action.payload

  try {
    const data = yield call(async () =>
      await request(`${apiHost}/forwardingrequest/sveastemplate`, 'POST', form)
    )
    yield put(saveTemplate(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchForwardingRequestDeleteTemplateAsync(action: any) {
  const form: any = action.payload

  try {
    const data = yield call(async () =>
      await request(`${apiHost}/forwardingrequest/deletetemplateconfirmed`, 'POST', form)
    )
    yield put(deleteTemplate(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchForwardingRequestAsync() {
  yield put(setLoading(true))

  try {
    const data = yield call(async () =>
      await request(`${apiHost}/forwardingrequest/create`)
    )
    yield put(setForwardingRequest(data))
  } catch (error) {
    yield put(requestError())
  }

  yield put(setLoading(false))
}

export function* fetchForwardingNotesAsync() {
  yield put(setLoading(true))

  try {
    const data = yield call(async () =>
      await request(`${apiHost}/forwardingnote`)
    )
    yield put(setNotes(data))
  } catch (error) {
    yield put(requestError())
  }

  yield put(setLoading(false))
}

export function* rootSaga() {
  yield all([
    takeEvery(C.FETCHED_AUTH, fetchAuthAsync)
  ])
  yield all([
    takeEvery(C.FETCHED_LOGIN, fetchLoginAsync)
  ])
  yield all([
    takeEvery(C.FETCHED_LOGOUT, fetchLogoutAsync)
  ])
  yield all([
    takeEvery(C.FETCHED_FORWARDING_REQUEST, fetchForwardingRequestAsync)
  ])
  yield all([
    takeEvery(C.FETCHED_FORWARDING_REQUEST_CREATE, fetchForwardingRequestCreateAsync)
  ])
  yield all([
    takeEvery(C.FETCHED_FORWARDING_REQUEST_TEMPLATES, fetchForwardingRequestTemplatesAsync)
  ])
  yield all([
    takeEvery(C.FETCHED_FORWARDING_REQUEST_SAVE_TEMPLATE, fetchForwardingRequestSaveTemplateAsync)
  ])
  yield all([
    takeEvery(C.FETCHED_FORWARDING_REQUEST_DELETE_TEMPLATE, fetchForwardingRequestDeleteTemplateAsync)
  ])
  yield all([
    takeEvery(C.FETCHED_FORWARDING_NOTES, fetchForwardingNotesAsync)
  ])
}