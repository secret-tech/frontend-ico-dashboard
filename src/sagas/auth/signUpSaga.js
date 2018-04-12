import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { post } from '../../utils/fetch';
import Toast from '../../utils/toaster';

import { initSignUp, verifySignUp, CLOSE_WALLET_CREDS, changeStep, resetStore } from '../../redux/modules/auth/signUp';
import { login } from '../../redux/modules/app/app';


function* initSignUpIterator({ payload }) {
  try {
    const { referral, ...restPayload } = payload;
    if (referral) Object.assign(restPayload, { referral });
    const data = yield call(post, '/user', restPayload);

    yield put(initSignUp.success(data));
    yield put(changeStep('verifySignUp'));
  } catch (e) {
    yield put(initSignUp.failure());
    yield call(console.log, e);

    if (e.error.isJoi) {
      yield call([Toast, Toast.red], { message: e.error.details[0].message });
    } else {
      yield call([Toast, Toast.red], { message: e.message });
    }
  }
}

function* initSignUpSaga() {
  yield takeLatest(
    initSignUp.REQUEST,
    initSignUpIterator
  );
}


function* verifySignUpIterator({ payload }) {
  try {
    const data = yield call(post, '/user/activate', payload);
    yield put(verifySignUp.success(data));
    yield put(changeStep('walletCreds'));
  } catch (e) {
    yield put(verifySignUp.failure(new SubmissionError({ _error: e.error })));
    yield call([Toast, Toast.red], { message: e.message });
  }
}

function* verifySignUpSaga() {
  yield takeLatest(
    verifySignUp.REQUEST,
    verifySignUpIterator
  );
}


const getAccessToken = (state) => state.auth.signUp.accessToken;

function* closeWalletCredsIterator() {
  const accessToken = yield select(getAccessToken);
  yield put(login(accessToken));
  yield put(resetStore());
  yield put(push('/app/dashboard'));
}

function* closeWalletCredsSaga() {
  yield takeLatest(
    CLOSE_WALLET_CREDS,
    closeWalletCredsIterator
  );
}


export default function* () {
  yield all([
    fork(initSignUpSaga),
    fork(verifySignUpSaga),
    fork(closeWalletCredsSaga)
  ]);
}
