import { all, takeLatest, call, put, fork, select } from 'redux-saga/effects';
import { push } from 'react-router-redux';
import { SubmissionError } from 'redux-form';
import { post } from '../../utils/fetch';
import Toast from '../../utils/toaster';

import { initSignUp, infoSignUp, verifySignUp, CLOSE_WALLET_CREDS, changeStep, resetStore } from '../../redux/modules/auth/signUp';
import { login } from '../../redux/modules/app/app';
import * as routes from '../../routes';


function* initSignUpIterator({ payload }) {
  try {
    yield put(initSignUp.success(payload));
    yield put(changeStep('infoSignUp'));
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


function* infoSignUpIterator({ payload }) {
  try {
    const { referral, ...restPayload } = payload; // if referral empty - not send
    const data = yield call(post, '/user', referral ? payload : restPayload);
    yield put(infoSignUp.success(data));
    yield put(changeStep('verifySignUp'));
  } catch (e) {
    yield put(changeStep('initSignUp'));
    yield put(infoSignUp.failure());
    yield call(console.log, e);

    if (e.error.isJoi) {
      yield call([Toast, Toast.red], { message: e.error.details[0].message });
    } else {
      yield call([Toast, Toast.red], { message: e.message });
    }
  }
}

function* infoSignUpSaga() {
  yield takeLatest(
    infoSignUp.REQUEST,
    infoSignUpIterator
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
  yield put(push(routes.DASHBOARD));
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
    fork(infoSignUpSaga),
    fork(verifySignUpSaga),
    fork(closeWalletCredsSaga)
  ]);
}
