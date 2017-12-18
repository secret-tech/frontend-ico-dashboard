import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import BigNum from 'bignumber.js';
import { get } from '../../utils/fetch';

import { fetchFee } from '../../redux/modules/dashboard/txFee';

/**
 * Fetch Tx Fee
 */

function* fetchFeeIterator() {
  try {
    const data = yield call(get, '/dashboard/investTxFee');

    const expectedTxFee = new BigNum(data.expectedTxFee);
    const minEth = new BigNum(0.1);

    const body = {
      minInvest: minEth.plus(expectedTxFee).toString(),
      ...data
    };

    yield put(fetchFee.success(body));
  } catch (e) {
    yield put(fetchFee.failure(e));
  }
}

function* fetchFeeSaga() {
  yield takeLatest(
    fetchFee.REQUEST,
    fetchFeeIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(fetchFeeSaga)
  ]);
}
