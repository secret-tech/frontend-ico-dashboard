import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { get, post } from '../../utils/fetch';
import Toast from '../../utils/toaster';

import {
  OPEN_DISABLE_2FA_POPUP,
  initiateDisableTwoFactorAuth,
  verifyDisableTwoFactorAuth,
  closeDisableTwoFactorAuthPopup
} from '../../redux/modules/settings/disableTwoFactorAuth';
import { fetchUser } from '../../redux/modules/app/app';


function* initiateDisableTwoFactorAuthIterator() {
  try {
    yield put(initiateDisableTwoFactorAuth());
    const data = yield call(get, '/user/disable2fa/initiate');
    yield put(initiateDisableTwoFactorAuth.success(data.verification));
  } catch (e) {
    yield put(initiateDisableTwoFactorAuth.failure());
    yield call(console.log, e);
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* initiateDisableTwoFactorAuthSaga() {
  yield takeLatest(
    OPEN_DISABLE_2FA_POPUP,
    initiateDisableTwoFactorAuthIterator
  );
}


function* verifyDisableTwoFactorAuthIterator({ payload }) {
  try {
    yield call(post, '/user/disable2fa/verify', { verification: payload });
    yield put(verifyDisableTwoFactorAuth.success());
    yield put(fetchUser());
    yield call([Toast, Toast.green], { message: 'Two-Factor Auth has been disabled' });
    yield put(closeDisableTwoFactorAuthPopup());
  } catch (e) {
    yield put(verifyDisableTwoFactorAuth.failure());
    yield call(console.log, e);
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* verifyDisableTwoFactorAuthSaga() {
  yield takeLatest(
    verifyDisableTwoFactorAuth.REQUEST,
    verifyDisableTwoFactorAuthIterator
  );
}


export default function* () {
  yield all([
    fork(initiateDisableTwoFactorAuthSaga),
    fork(verifyDisableTwoFactorAuthSaga)
  ]);
}
