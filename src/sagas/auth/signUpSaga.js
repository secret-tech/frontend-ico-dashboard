import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { post } from '../../utils/fetch';

import { signUp, confirmEmail, END_SIGNUP, resetStore } from '../../redux/modules/auth/signUp';
import { login } from '../../redux/modules/app/app';

function* signUpIterator({ payload }) {
  try {
    const { referral, ...restPayload } = payload;

    if (referral) {
      Object.assign(restPayload, { referral });
    }

    const data = yield call(post, '/user', restPayload);
    yield put(signUp.success(data));
  } catch (e) {
    if (e.error.isJoi) {
      yield put(signUp.failure(new SubmissionError({ _error: e.error.details[0].message })));
    } else {
      yield put(signUp.failure(new SubmissionError({ _error: e.error })));
    }
  }
}

function* signUpSaga() {
  yield takeLatest(
    signUp.REQUEST,
    signUpIterator
  );
}

function* confirmEmailIterator({ payload }) {
  try {
    const data = yield call(post, '/user/activate', payload);
    yield put(confirmEmail.success(data));
  } catch (e) {
    yield put(confirmEmail.failure(new SubmissionError({ _error: e.error })));
  }
}

function* confirmEmailSaga() {
  yield takeLatest(
    confirmEmail.REQUEST,
    confirmEmailIterator
  );
}

function* endSignUpIterator({ payload }) {
  yield put(login(payload)); // login
  yield put(push('/dashboard')); // redirect
  yield put(resetStore()); // reset signup reducer
}

function* endSignUpSaga() {
  yield takeLatest(
    END_SIGNUP,
    endSignUpIterator
  );
}

export default function* () {
  yield all([
    fork(signUpSaga),
    fork(confirmEmailSaga),
    fork(endSignUpSaga)
  ]);
}
