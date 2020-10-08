import C from './types'
import { all, put, call, takeEvery } from 'redux-saga/effects'
import {
  loginPending,
  loginSuccess,
  requestError
} from './actions'

const host = process.env.API_HOST || 'http://localhost:5000'

export function* fetchLoginAsync(action: any) {
  const form: any = action.payload

  try {
    yield put(loginPending())

    const data = yield call(async () => {
      return await fetch(`${host}/api`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(form)
          })
        .then(res => res.json())
      }
    )
    
    yield put(loginSuccess(data))
  } catch (error) {
    yield put(requestError())
  }
}

export function* rootSaga() {
  yield all([
    takeEvery(C.FETCHED_LOGIN, fetchLoginAsync)
  ])
}