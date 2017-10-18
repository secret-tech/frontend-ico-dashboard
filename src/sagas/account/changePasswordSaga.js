import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { post } from '../../utils/fetch';

import { changePassword, verifyChangePassword } from '../../redux/modules/account/changePassword';

/*
 * Change password
 */

function* changePasswordIterator({ payload }) {
  try {
    const { data } = yield call(post, '/user/me/passwordChange/initiate', payload);
    yield put(changePassword.success(Object.assign({}, data, payload)));
  } catch (e) {
    const formError = new SubmissionError({
      _error: 'Ooops! Error!'
    });

    yield put(changePassword.failure(formError));
  }
}

function* changePasswordSaga() {
  yield takeLatest(
    changePassword.REQUEST,
    changePasswordIterator
  );
}

/*
 * Verify change password
 */

function* verifyChangePasswordIterator({ payload }) {
  try {
    yield call(post, '/user/me/passwordChange/verify', payload);
  } catch (e) {
    const formError = new SubmissionError({
      _error: 'Ooops! Error!'
    });

    yield put(changePassword.failure(formError));
  }
}

function* verifyChangePasswordSaga() {
  yield takeLatest(
    verifyChangePassword.REQUEST,
    verifyChangePasswordIterator
  );
}

/*
 * Export
 */

export default function* () {
  yield all([
    fork(changePasswordSaga),
    fork(verifyChangePasswordSaga)
  ]);
}
