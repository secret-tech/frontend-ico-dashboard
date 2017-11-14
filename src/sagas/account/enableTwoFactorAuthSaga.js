import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { get, post } from '../../utils/fetch';
import notify from '../../utils/notifications';

import {
  OPEN_ENABLE_2FA_POPUP,
  initiateEnableTwoFactorAuth,
  verifyEnableTwoFactorAuth
} from '../../redux/modules/account/enableTwoFactorAuth';
import { fetchUser } from '../../redux/modules/app/app';

/**
 * Initiate enable two factor auth
 */

function* initiateEnableTwoFactorAuthIterator() {
  try {
    yield put(initiateEnableTwoFactorAuth());
    const data = yield call(get, '/user/enable2fa/initiate');
    yield put(initiateEnableTwoFactorAuth.success(data.verification));
  } catch (e) {
    yield put(initiateEnableTwoFactorAuth.failure(new SubmissionError({ _error: e.error })));
  }
}

function* initiateEnableTwoFactorAuthSaga() {
  yield takeLatest(
    OPEN_ENABLE_2FA_POPUP,
    initiateEnableTwoFactorAuthIterator
  );
}

/**
 * Verify enable two factor auth
 */

function* verifyEnableTwoFactorAuthIterator({ payload }) {
  try {
    yield call(post, '/user/enable2fa/verify', { verification: payload });
    yield put(verifyEnableTwoFactorAuth.success());
    yield put(fetchUser());
    yield put(notify('success', 'Two-Factor Auth has been enabled'));
  } catch (e) {
    yield put(verifyEnableTwoFactorAuth.failure(new SubmissionError({ _error: e.error })));
  }
}

function* verifyEnableTwoFactorAuthSaga() {
  yield takeLatest(
    verifyEnableTwoFactorAuth.REQUEST,
    verifyEnableTwoFactorAuthIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(initiateEnableTwoFactorAuthSaga),
    fork(verifyEnableTwoFactorAuthSaga)
  ]);
}
