import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { success, error, warning, info } from 'react-notification-system-redux';
import { get } from '../../utils/fetch';

import { fetchDashboard } from '../../redux/modules/dashboard/dashboard';

/**
 * Fetch Dashboard
 */

function* fetchDashboardIterator() {
  try {
    const data = yield call(get, '/dashboard');
    yield put(fetchDashboard.success(data));
    yield put(success({
      message: 'Dashboard fetched successfully!',
      position: 'bc',
      autoDismiss: 0
    }));

    yield put(error({
      message: 'Dashboard fetched successfully!',
      position: 'bc',
      autoDismiss: 0
    }));

    yield put(warning({
      message: 'Dashboard fetched successfully!',
      position: 'bc',
      autoDismiss: 0
    }));

    yield put(info({
      message: 'Dashboard fetched successfully!',
      position: 'bc',
      autoDismiss: 0
    }));
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
