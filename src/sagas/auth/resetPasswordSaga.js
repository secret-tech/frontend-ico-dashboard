import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { post } from '../../utils/fetch';
import notify from '../../utils/notifications';

import { initResetPassword, verifyResetPassword, changeStep, resetStore } from '../../redux/modules/auth/resetPassword';


function* initResetPasswordIterator({ payload }) {
  try {
    const data = yield call(post, '/user/resetPassword/initiate', payload);
    const body = {
      verification: data.verification,
      email: payload.email
    };
    yield put(initResetPassword.success(body));
    yield put(changeStep('verifyResetPassword'));
  } catch (e) {
    yield put(initResetPassword.failure());
    yield call(console.log, e);
    yield put(notify('error', e.error));
  }
}

function* initResetPasswordSaga() {
  yield takeLatest(
    initResetPassword.REQUEST,
    initResetPasswordIterator
  );
}


function* verifyResetPasswordIterator({ payload }) {
  try {
    yield call(post, '/user/resetPassword/verify', payload);
    yield put(verifyResetPassword.success());
    yield put(notify('success', 'Password changed'));
    yield put(push('/auth/sign-in'));
    yield put(resetStore());
  } catch (e) {
    yield put(verifyResetPassword.failure());
    yield call(console.log, e);
    yield put(notify('error', e.error));
  }
}

function* verifyResetPasswordSaga() {
  yield takeLatest(
    verifyResetPassword.REQUEST,
    verifyResetPasswordIterator
  );
}


export default function* () {
  yield all([
    fork(initResetPasswordSaga),
    fork(verifyResetPasswordSaga)
  ]);
}
