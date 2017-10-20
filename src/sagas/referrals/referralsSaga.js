import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { get } from '../../utils/fetch';

import { fetchReferrals } from '../../redux/modules/referrals/referrals';

/**
 * Fetch Referrals
 */

function* fetchReferralsIterator() {
  try {
    const data = yield call(get, '/dashboard/referral');
    yield put(fetchReferrals.success(data));
  } catch (e) {
    yield put(fetchReferrals.failure(e));
  }
}

function* fetchReferralsSaga() {
  yield takeLatest(
    fetchReferrals.REQUEST,
    fetchReferralsIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(fetchReferralsSaga)
  ]);
}
