import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { get } from '../../utils/fetch';

import { initVerification } from '../../redux/modules/verification/verification';

/**
 * Init verification
 */

function* initVerificationIterator() {
  try {
    const data = yield call(get, '/kyc/init');
    yield put(initVerification.success(data));
  } catch (e) {
    yield put(initVerification.failure(e));
  }
}

function* initVerificationSaga() {
  yield takeLatest(
    initVerification.REQUEST,
    initVerificationIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(initVerificationSaga)
  ]);
}
