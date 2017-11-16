import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import { removeToken, setToken, getToken, isAuth } from '../../utils/auth';
import { get } from '../../utils/fetch';

import {
  login,
  setAuthState,
  LOGIN,
  CHECK_AUTH,
  LOGOUT,
  logout,
  fetchUser
} from '../../redux/modules/app/app';

/*
 * Login
 */

function* loginIterator({ payload: token }) {
  yield call(setToken, token);
  yield put(setAuthState({ authorized: true, token }));
}

function* loginSaga() {
  yield takeLatest(
    LOGIN,
    loginIterator
  );
}

/*
 * Check auth
 */

function* checkAuthIterator() {
  const auth = yield call(isAuth);

  if (auth) {
    const token = yield call(getToken);
    yield put(login(token));
  } else {
    yield put(setAuthState({ authorized: false, token: '' }));
  }
}

function* checkAuthSaga() {
  yield takeLatest(
    CHECK_AUTH,
    checkAuthIterator
  );
}

/*
 * Logout
 */

function* logoutIterator() {
  yield call(removeToken);
  yield put(setAuthState({ authorized: false, token: '' }));
}

function* logoutSaga() {
  yield takeLatest(
    LOGOUT,
    logoutIterator
  );
}

/*
 * Fetch user
 */

function* fetchUserIterator() {
  try {
    const data = yield call(get, '/user/me');
    yield put(fetchUser.success(data));
  } catch (e) {
    yield put(fetchUser.failure(e));

    if (e.statusCode === 401) {
      yield put(logout());
    }
  }
}

function* fetchUserSaga() {
  yield takeLatest(
    fetchUser.REQUEST,
    fetchUserIterator
  );
}

/*
 * Export
 */

export default function* () {
  yield all([
    fork(loginSaga),
    fork(checkAuthSaga),
    fork(logoutSaga),
    fork(fetchUserSaga)
  ]);
}
