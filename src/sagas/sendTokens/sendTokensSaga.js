import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
import Toast from '../../utils/toaster';
import { post } from '../../utils/fetch';

import {
  setMnemonicPhrase,
  initiateSendTokens,
  verifySendTokens,
  resetState
} from '../../redux/modules/sendTokens/sendTokens';

/**
 * Initiate buy tokens
 */

function* initiateSendTokensIterator({ payload }) {
  try {
    yield put(setMnemonicPhrase(payload.mnemonic));
    const data = yield call(post, '', payload);
    yield put(initiateSendTokens.success(data.verification));
  } catch (e) {
    yield put(initiateSendTokens.failure(new SubmissionError({ _error: e.error })));
    yield call([Toast,Toast.red],{message:e.message});
  }
}

function* initiateSendTokensSaga() {
  yield takeLatest(
    initiateSendTokens.REQUEST,
    initiateSendTokensIterator
  );
}

/**
 * Verify buy tokens
 */

function* verifySendTokensIterator({ payload }) {
  try {
    yield call(post, '', payload);
    yield call([Toast,Toast.green],{message:'Success! Go to Transactions to check status'});
    yield put(verifySendTokens.success());
    yield put(resetState());
  } catch (e) {
    yield call(console.error, e.error);
    yield put(verifySendTokens.failure(new SubmissionError({ _error: e.error })));
    yield call([Toast,Toast.red],{message:e.message});
  }
}

function* verifySendTokensSaga() {
  yield takeLatest(
    verifySendTokens.REQUEST,
    verifySendTokensIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(initiateSendTokensSaga),
    fork(verifySendTokensSaga)
  ]);
}
