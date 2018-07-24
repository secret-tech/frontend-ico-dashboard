import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import { get, post } from '../../utils/fetch';
import Toast from '../../utils/toaster';

import {
  OPEN_ENABLE_2FA_POPUP,
  initiateEnableTwoFactorAuth,
  verifyEnableTwoFactorAuth,
  closeEnableTwoFactorAuthPopup
} from '../../redux/modules/settings/enableTwoFactorAuth';
import { fetchUser } from '../../redux/modules/app/app';


function* initiateEnableTwoFactorAuthIterator() {
  try {
    yield put(initiateEnableTwoFactorAuth());
    const data = yield call(get, '/user/enable2fa/initiate');
    yield put(initiateEnableTwoFactorAuth.success(data.verification));
  } catch (e) {
    yield put(initiateEnableTwoFactorAuth.failure(new SubmissionError({ _error: e.error })));
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* initiateEnableTwoFactorAuthSaga() {
  yield takeLatest(
    OPEN_ENABLE_2FA_POPUP,
    initiateEnableTwoFactorAuthIterator
  );
}


function* verifyEnableTwoFactorAuthIterator({ payload }) {
  try {
    yield call(post, '/user/enable2fa/verify', { verification: payload });
    yield put(verifyEnableTwoFactorAuth.success());
    yield put(fetchUser());
    yield call([Toast, Toast.green], { message: 'Two-Factor Auth has been enabled' });
    yield put(closeEnableTwoFactorAuthPopup());
  } catch (e) {
    yield put(verifyEnableTwoFactorAuth.failure(new SubmissionError({ _error: e.error })));
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* verifyEnableTwoFactorAuthSaga() {
  yield takeLatest(
    verifyEnableTwoFactorAuth.REQUEST,
    verifyEnableTwoFactorAuthIterator
  );
}


export default function* () {
  yield all([
    fork(initiateEnableTwoFactorAuthSaga),
    fork(verifyEnableTwoFactorAuthSaga)
  ]);
}
