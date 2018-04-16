import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { get, post } from '../../utils/fetch';
import Toast from '../../utils/toaster';

import {
  OPEN_DISABLE_2FA_POPUP,
  initiateDisableTwoFactorAuth,
  verifyDisableTwoFactorAuth
} from '../../redux/modules/settings/disableTwoFactorAuth';
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
    yield call([Toast, Toast.red], { message: e.message });
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
    yield call([Toast, Toast.green], { message: 'Two-Factor Auth has been disabled' });
  } catch (e) {
    yield put(verifyDisableTwoFactorAuth.failure(new SubmissionError({ _error: e.error })));
    yield call([Toast, Toast.red], { message: e.message });
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
