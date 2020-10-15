import C from './types'
import { all, put, call, takeEvery } from 'redux-saga/effects'
import {
  loginSuccess,
  logoutSuccess,
  requestError,
  addToHistory,
  setTemplates,
  saveTemplate,
  deleteTemplate,
  setNotes
} from './actions'
import { request } from '../utils/functions'
import { apiHost } from '../utils/config'

export function* fetchLoginAsync(action: any) {
  const form: any = action.payload

  console.log(form)

  try {
    const data = yield call(async () =>
      await request(`${apiHost}/account/login`, 'POST', form)
    )
    yield put(loginSuccess(data))

  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchLogoutAsync(action: any) {
  const form: any = action.payload

  try {
    yield call(async () =>
      await request(`${apiHost}/account/logout`, 'POST', form)
    )
    yield put(logoutSuccess())
  } catch (error) {
    yield put(requestError())
  }
}

export function* fetchForwardingRequestCreateAsync(action: any) {
  const form: any = action.payload

  try {
    const data = yield call(async () =>
      await request(`${apiHost}/forwardingrequest/create`, 'POST', form)
    )
    yield put(addToHistory(data))
  } catch (error) {
    yield put(requestError())
  }
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

export function* fetchForwardingNotesAsync() {
  try {
    const data = yield call(async () =>
      await request(`${apiHost}/forwardingnote`)
    )
    yield put(setNotes(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(C.FETCHED_LOGIN, fetchLoginAsync)
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