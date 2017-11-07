import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { get } from '../../utils/fetch';

import { fetchTransactions } from '../../redux/modules/transactions/transactions';

/**
 * Fetch Transactions
 */

function* fetchTransactionsIterator() {
  try {
    const data = yield call(get, '/dashboard/transactions');
    yield put(fetchTransactions.success(data));
  } catch (e) {
    yield put(fetchTransactions.failure(e));
  }
}

function* fetchTransactionsSaga() {
  yield takeLatest(
    fetchTransactions.REQUEST,
    fetchTransactionsIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(fetchTransactionsSaga)
  ]);
}
