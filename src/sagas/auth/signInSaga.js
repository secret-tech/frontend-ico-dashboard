import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { post } from '../../utils/fetch';
import notify from '../../utils/notifications';

import { initSignIn, verifySignIn, changeStep, resetStore } from '../../redux/modules/auth/signIn';
import { login } from '../../redux/modules/app/app';


function* initSignInIterator({ payload }) {
  try {
    const data = yield call(post, '/user/login/initiate', payload);
    yield put(initSignIn.success(data));
    yield put(changeStep('verifySignIn'));
  } catch (e) {
    yield put(initSignIn.failure());
    yield call(console.log, e);
    yield put(notify('error', e.error));
  }
}

function* initSignInSaga() {
  yield takeLatest(
    initSignIn.REQUEST,
    initSignInIterator
  );
}


function* verifySignInIterator({ payload }) {
  try {
    const data = yield call(post, '/user/login/verify', payload);
    yield put(verifySignIn.success());
    yield put(login(data.accessToken));
    yield put(resetStore());
    yield put(push('/app/dashboard'));
  } catch (e) {
    yield put(verifySignIn.failure());
    yield call(console.log, e);
    yield put(notify('error', e.error));
  }
}

function* verifySingInSaga() {
  yield takeLatest(
    verifySignIn.REQUEST,
    verifySignInIterator
  );
}


export default function* () {
  yield all([
    fork(initSignInSaga),
    fork(verifySingInSaga)
  ]);
}
