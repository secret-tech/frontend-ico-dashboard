import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { post } from '../../utils/fetch';
import Toast from '../../utils/toaster';

import {
  initChangePassword,
  verifyChangePassword,
  closeInitChangePasswordPopup,
  openVerifyChangePasswordPopup,
  resetStore
} from '../../redux/modules/settings/changePassword';


function* initChangePasswordIterator({ payload }) {
  try {
    const data = yield call(post, '/user/me/changePassword/initiate', payload);
    yield put(initChangePassword.success(Object.assign({}, data, payload)));
    yield put(closeInitChangePasswordPopup());
    yield put(openVerifyChangePasswordPopup());
  } catch (e) {
    yield put(initChangePassword.failure());
    yield call(console.log, e);
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* initChangePasswordSaga() {
  yield takeLatest(
    initChangePassword.REQUEST,
    initChangePasswordIterator
  );
}


function* verifyChangePasswordIterator({ payload }) {
  try {
    yield call(post, '/user/me/changePassword/verify', payload);
    yield put(verifyChangePassword.success());
    yield call([Toast, Toast.green], { message: 'Password changed' });
    yield put(resetStore());
  } catch (e) {
    yield put(verifyChangePassword.failure());
    yield call(console.log, e);
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* verifyChangePasswordSaga() {
  yield takeLatest(
    verifyChangePassword.REQUEST,
    verifyChangePasswordIterator
  );
}


export default function* () {
  yield all([
    fork(initChangePasswordSaga),
    fork(verifyChangePasswordSaga)
  ]);
}
