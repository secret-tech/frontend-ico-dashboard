import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { get, post } from '../../utils/fetch';
import notify from '../../utils/notifications';

import {
  OPEN_DISABLE_2FA_POPUP,
  initiateDisableTwoFactorAuth,
  verifyDisableTwoFactorAuth
} from '../../redux/modules/account/disableTwoFactorAuth';
import { fetchUser } from '../../redux/modules/app/app';

/**
 * Initiate disable two factor auth
 */

function* initiateDisableTwoFactorAuthIterator() {
  try {
    yield put(initiateDisableTwoFactorAuth());
    const data = yield call(get, '/user/disable2fa/initiate');
    yield put(initiateDisableTwoFactorAuth.success(data.verification));
  } catch (e) {
    yield put(initiateDisableTwoFactorAuth.failure(new SubmissionError({ _error: e.error })));
  }
}

function* initiateDisableTwoFactorAuthSaga() {
  yield takeLatest(
    OPEN_DISABLE_2FA_POPUP,
    initiateDisableTwoFactorAuthIterator
  );
}

/**
 * Verify disable two factor auth
 */

function* verifyDisableTwoFactorAuthIterator({ payload }) {
  try {
    yield call(post, '/user/disable2fa/verify', { verification: payload });
    yield put(verifyDisableTwoFactorAuth.success());
    yield put(fetchUser());
    yield put(notify('success', 'Two-Factor Auth has been disabled'));
  } catch (e) {
    yield put(verifyDisableTwoFactorAuth.failure(new SubmissionError({ _error: e.error })));
  }
}

function* verifyDisableTwoFactorAuthSaga() {
  yield takeLatest(
    verifyDisableTwoFactorAuth.REQUEST,
    verifyDisableTwoFactorAuthIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(initiateDisableTwoFactorAuthSaga),
    fork(verifyDisableTwoFactorAuthSaga)
  ]);
}
