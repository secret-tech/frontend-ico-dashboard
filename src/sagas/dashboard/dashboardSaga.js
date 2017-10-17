import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { get } from '../../utils/fetch';

import { fetchDashboard } from '../../redux/modules/dashboard/dashboard';

/**
 * Fetch Dashboard
 */

function* fetchDashboardIterator() {
  try {
    const data = yield call(get, '/dashboard');
    yield put(fetchDashboard.success(data));
  } catch (e) {
    yield put(fetchDashboard.failure(e));
  }
}

function* fetchDashboardSaga() {
  yield takeLatest(
    fetchDashboard.REQUEST,
    fetchDashboardIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(fetchDashboardSaga)
  ]);
}
