import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
// import { post } from '../../utils/api';

import { SIGN_IN, signIn } from '../../redux/modules/auth/signIn';

function* signInIterator({ payload }) {
  try {
    yield call(console.warn, payload);
    // const { data: { token } } = yield call(post, '/employee/login', payload);
    yield put(signIn());
  } catch (e) {
    yield call(console.error, new SubmissionError(e));
  }
}

function* signInSaga() {
  yield takeLatest(
    SIGN_IN,
    signInIterator
  );
}

export default function* () {
  yield all([
    fork(signInSaga)
  ]);
}
