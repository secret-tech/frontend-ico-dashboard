import { all, fork } from 'redux-saga/effects';

import appSaga from './app/app';

export default function* () {
  yield all([
    fork(appSaga)
  ]);
}
