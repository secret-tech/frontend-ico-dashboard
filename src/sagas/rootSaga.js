import { all, fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import appSaga from './app/app';

import emailsInputSaga from './common/emailsInputSaga';

import signInSaga from './auth/signInSaga';

export default function* () {
  yield all([
    fork(formActionSaga),
    fork(appSaga),
    fork(emailsInputSaga),
    fork(signInSaga)
  ]);
}
