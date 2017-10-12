import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { post } from '../../utils/fetch';

import { signIn, verifySignIn } from '../../redux/modules/auth/signIn';
import { login } from '../../redux/modules/app/app';

function* signInIterator({ payload }) {
  try {
    const data = yield call(post, '/user/login/initiate', payload);
    yield put(login(data.accessToken));
    yield put(signIn.success(data));
  } catch (e) {
    const formError = new SubmissionError({
      _error: 'Ooops! Error!'
    });

    yield put(signIn.failure(formError));
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
    yield call(console.log, payload);
    const data = yield call(post, '/user/login/verify', payload);
    yield call(console.log, data);
    yield put(verifySignIn.success());
    yield put(login(data.accessToken));
  } catch (e) {
    const formError = new SubmissionError({
      _error: 'Ooops! Error!'
    });

    yield put(verifySignIn.failure(formError));
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
    fork(signInSaga),
    fork(verifySingInSaga)
  ]);
}
