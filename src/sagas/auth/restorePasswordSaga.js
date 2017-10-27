import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { post } from '../../utils/fetch';
import notify from '../../utils/notifications';
import { namedRoutes } from '../../routes';

import { initiateRestorePassword, setPin, verifyRestorePassword } from '../../redux/modules/auth/restorePassword';

/**
 * Initiate restore password
 */

function* initiateRestorePasswordIterator({ payload }) {
  try {
    const data = yield call(post, '/user/resetPassword/initiate', payload);
    const body = {
      verification: data.verification,
      email: payload.email
    };
    yield put(initiateRestorePassword.success(body));
  } catch (e) {
    yield put(initiateRestorePassword.failure(new SubmissionError({ _error: e.error })));
  }
}

function* initiateRestorePasswordSaga() {
  yield takeLatest(
    initiateRestorePassword.REQUEST,
    initiateRestorePasswordIterator
  );
}

/**
 * Set pin
 */

function* setPinIterator({ payload }) {
  yield put(setPin.success(payload.pin));
}

function* setPinSaga() {
  yield takeLatest(
    setPin.REQUEST,
    setPinIterator
  );
}

/**
 * Verify restore password
 */

function* verifyRestorePasswordIterator({ payload }) {
  try {
    yield call(post, '/user/resetPassword/verify', payload);
    yield put(verifyRestorePassword.success());
    yield put(notify('success', 'Password changed'));
    yield put(push(namedRoutes.signIn));
  } catch (e) {
    yield put(verifyRestorePassword.failure(new SubmissionError({ _error: e.error })));
  }
}

function* verifyRestorePasswordSaga() {
  yield takeLatest(
    verifyRestorePassword.REQUEST,
    verifyRestorePasswordIterator
  );
}

/*
 * Export
 */

export default function* () {
  yield all([
    fork(initiateRestorePasswordSaga),
    fork(setPinSaga),
    fork(verifyRestorePasswordSaga)
  ]);
}
