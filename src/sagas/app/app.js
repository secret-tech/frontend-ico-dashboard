import { all, takeEvery, call, fork } from 'redux-saga/effects';

import { INCREMENT, DECREMENT } from '../../redux/modules/app/app';

/**
 * Increment Saga
 */

function* incrementIterator() {
  yield call(console.log, 'counter + 1');
}

function* incrementSaga() {
  yield takeEvery(
    INCREMENT,
    incrementIterator
  );
}

/**
 * Decrement Saga
 */

function* decrementIterator() {
  yield call(console.log, 'counter - 1');
}

function* descrementSaga() {
  yield takeEvery(
    DECREMENT,
    decrementIterator
  );
}

/**
 * Export
 */

export default function* () {
  yield all([
    fork(incrementSaga),
    fork(descrementSaga)
  ]);
}
