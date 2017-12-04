import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { change, reset, SubmissionError } from 'redux-form';
import notify from '../../utils/notifications';
import { post } from '../../utils/fetch';
import { NUMBER_REGEXP } from '../../utils/validators';

import {
  CHANGE_ETH,
  CHANGE_JCR,
  setEth,
  setMnemonic,
  initiateBuyTokens,
  verifyBuyTokens,
  resetStore
} from '../../redux/modules/dashboard/buyTokens';

const getJcrTokenPrice = (state) => state.dashboard.dashboard.jcrTokenPrice.ETH;

/**
 * Change eth
 */

function* changeEthIterator({ payload }) {
  if (NUMBER_REGEXP.test(payload)) {
    const jcrTokenPrice = yield select(getJcrTokenPrice);
    yield put(change('buyTokens', 'eth', payload));
    yield put(setEth(payload));
    if (payload) {
      const jcr = (payload - 0.004) / jcrTokenPrice;
      yield put(change('buyTokens', 'jcr', jcr.toFixed()));
    } else {
      yield put(change('buyTokens', 'jcr', ''));
    }
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
    yield put(change('buyTokens', 'jcr', payload));
    if (payload) {
      yield put(change('buyTokens', 'eth', (payload * jcrTokenPrice) + 0.004));
      yield put(setEth((payload * jcrTokenPrice) + 0.004));
    } else {
      yield put(change('buyTokens', 'eth', ''));
      yield put(setEth(0));
    }
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
    const body = {
      ...payload,
      ethAmount: payload.ethAmount - 0.004
    };
    yield put(setMnemonic(payload.mnemonic));
    const data = yield call(post, '/dashboard/invest/initiate', body);
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
    const body = {
      ...payload,
      ethAmount: payload.ethAmount - 0.004
    };
    yield call(post, '/dashboard/invest/verify', body);
    yield put(notify('success', 'Success! Go to Transactions to check the status'));
    yield put(verifyBuyTokens.success());
    yield put(resetStore());
    yield put(reset('buyTokens'));
  } catch (e) {
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
