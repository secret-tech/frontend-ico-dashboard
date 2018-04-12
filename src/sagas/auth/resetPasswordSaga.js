import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { post } from '../../utils/fetch';
import Toast from '../../utils/toaster';

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
    yield call([Toast, Toast.red], { message: e.message });
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
    yield call([Toast, Toast.green], { message: 'Password changed' });
    yield put(push('/auth/sign-in'));
    yield put(resetStore());
  } catch (e) {
    yield put(verifyResetPassword.failure());
    yield call(console.log, e);
    yield call([Toast, Toast.red], { message: e.message });
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
