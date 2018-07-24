import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { reset, SubmissionError } from 'redux-form';
import Toast from '../../utils/toaster';
import { post } from '../../utils/fetch';

import {
  initiateBuyTokens,
  verifyBuyTokens,
  openVerifyPopup,
  resetStore
} from '../../redux/modules/dashboard/buyTokens';


function* initiateBuyTokensIterator({ payload }) {
  try {
    const { verification } = yield call(post, '/dashboard/invest/initiate', payload);
    yield put(initiateBuyTokens.success({ verification, data: payload }));
    yield put(openVerifyPopup());
  } catch (e) {
    yield put(initiateBuyTokens.failure());
    yield call(console.log, e);
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* initiateBuyTokensSaga() {
  yield takeLatest(
    initiateBuyTokens.REQUEST,
    initiateBuyTokensIterator
  );
}


function* verifyBuyTokensIterator({ payload }) {
  try {
    yield call(post, '/dashboard/invest/verify', payload);
    yield call([Toast, Toast.green], { message: 'Success! Go to Transactions to check the status' });
    yield put(verifyBuyTokens.success());
    yield put(resetStore());
    yield put(reset('buyTokens'));
  } catch (e) {
    yield put(verifyBuyTokens.failure(new SubmissionError({ _error: e.error })));
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* verifyBuyTokensSaga() {
  yield takeLatest(
    verifyBuyTokens.REQUEST,
    verifyBuyTokensIterator
  );
}


export default function* () {
  yield all([
    fork(initiateBuyTokensSaga),
    fork(verifyBuyTokensSaga)
  ]);
}
