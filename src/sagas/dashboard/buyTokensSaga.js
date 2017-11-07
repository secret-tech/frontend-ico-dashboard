import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import notify from '../../utils/notifications';
import { post } from '../../utils/fetch';
import { NUMBER_REGEXP } from '../../utils/validators';

import {
  CHANGE_ETH, CHANGE_JCR,
  setEth, setJcr,
  setMnemonicPhrase,
  initiateBuyTokens,
  verifyBuyTokens,
  resetState
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
 * Initiate buy tokens
 */

function* initiateBuyTokensIterator({ payload }) {
  try {
    yield put(setMnemonicPhrase(payload.mnemonic));
    const data = yield call(post, '/dashboard/invest/initiate', payload);
    yield put(initiateBuyTokens.success(data.verification));
  } catch (e) {
    yield put(initiateBuyTokens.failure(new SubmissionError({ _error: e.error })));
  }
}

function* initiateBuyTokensSaga() {
  yield takeLatest(
    initiateBuyTokens.REQUEST,
    initiateBuyTokensIterator
  );
}

/**
 * Verify buy tokens
 */

function* verifyBuyTokensIterator({ payload }) {
  try {
    yield call(post, '/dashboard/invest/verify', payload);
    yield put(notify('success', 'Success! Go to Transactions to check status'));
    yield put(verifyBuyTokens.success());
    yield put(resetState());
  } catch (e) {
    yield call(console.error, e.error);
    yield put(verifyBuyTokens.failure(new SubmissionError({ _error: e.error })));
  }
}

function* verifyBuyTokensSaga() {
  yield takeLatest(
    verifyBuyTokens.REQUEST,
    verifyBuyTokensIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(changeEthSaga),
    fork(changeJcrSaga),
    fork(initiateBuyTokensSaga),
    fork(verifyBuyTokensSaga)
  ]);
}
