import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { post } from '../../utils/fetch';
import { namedRoutes } from '../../routes';

import { signIn, verifySignIn, endSignIn, END_SIGNIN, resetStore } from '../../redux/modules/auth/signIn';
import { login } from '../../redux/modules/app/app';

function* signInIterator({ payload }) {
  try {
    const data = yield call(post, '/user/login/initiate', payload);
    yield put(signIn.success(data));
  } catch (e) {
    yield put(signIn.failure(new SubmissionError({ _error: e.error })));
  }
}

function* signInSaga() {
  yield takeLatest(
    signIn.REQUEST,
    signInIterator
  );
}

function* verifySignInIterator({ payload }) {
  try {
    const data = yield call(post, '/user/login/verify', payload);
    yield put(verifySignIn.success());
    yield put(endSignIn(data.accessToken));
  } catch (e) {
    yield put(verifySignIn.failure(new SubmissionError({ _error: e.error })));
  }
}

function* verifySingInSaga() {
  yield takeLatest(
    verifySignIn.REQUEST,
    verifySignInIterator
  );
}

function* endSignInIterator({ payload }) {
  yield put(login(payload));
  yield put(push(namedRoutes.dashboard)); // redirect
  yield put(resetStore()); // reset signin reducer
}

function* endSignInISaga() {
  yield takeLatest(
    END_SIGNIN,
    endSignInIterator
  );
}

export default function* () {
  yield all([
    fork(signInSaga),
    fork(verifySingInSaga),
    fork(endSignInISaga)
  ]);
}
