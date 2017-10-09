import { all, takeLatest, call, put, fork } from 'redux-saga/effects';
import { SubmissionError } from 'redux-form';
// import { post } from '../../utils/api';

import { signIn } from '../../redux/modules/auth/signIn';

function* signInIterator({ payload }) {
  try {
    yield call(console.log, payload);
    const formError = new SubmissionError({
      _error: 'Ooops! Invalid email or password'
    });

    yield put(signIn.failure(formError));
    // const { data: { token } } = yield call(post, '/employee/login', payload);
    // yield put(signIn.success());
  } catch (e) {
    yield put(signIn.failure(new SubmissionError(e.errors)));
  }
}

function* signInSaga() {
  yield takeLatest(
    signIn.REQUEST,
    signInIterator
  );
}

export default function* () {
  yield all([
    fork(signInSaga)
  ]);
}
