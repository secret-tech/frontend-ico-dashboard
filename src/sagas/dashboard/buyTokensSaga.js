import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { get } from '../../utils/fetch';
import { NUMBER_REGEXP } from '../../utils/validators';

import {
  CHANGE_ETH, CHANGE_JCR,
  setEth, setJcr
} from '../../redux/modules/dashboard/buyTokens';

const getJcrTokenPrice = (state) => state.dashboard.dashboard.jcrTokenPrice.ETH;

/**
 * Change eth
 */

function* changeEthIterator({ payload }) {
  if (NUMBER_REGEXP.test(payload)) {
    const jcrTokenPrice = yield select(getJcrTokenPrice);
    yield put(setEth(payload));
    yield put(setJcr(payload / jcrTokenPrice));
  }
}

function* changeEthSaga() {
  yield takeLatest(
    CHANGE_ETH,
    changeEthIterator
  );
}

/**
 * Change jcr
 */

function* changeJcrIterator({ payload }) {
  if (NUMBER_REGEXP.test(payload)) {
    const jcrTokenPrice = yield select(getJcrTokenPrice);
    yield put(setJcr(payload));
    yield put(setEth(payload * jcrTokenPrice));
  }
}

function* changeJcrSaga() {
  yield takeLatest(
    CHANGE_JCR,
    changeJcrIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(changeEthSaga),
    fork(changeJcrSaga)
  ]);
}
