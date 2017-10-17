import { all, fork } from 'redux-saga/effects';
import { formActionSaga } from 'redux-form-saga';

import appSaga from './app/appSaga';

import emailsInputSaga from './common/emailsInputSaga';

import signUpSaga from './auth/signUpSaga';
import signInSaga from './auth/signInSaga';

import referralsSaga from './referrals/referralsSaga';

export default function* () {
  yield all([
    fork(formActionSaga),
    fork(appSaga),
    fork(emailsInputSaga),
    fork(signUpSaga),
    fork(signInSaga),
    fork(referralsSaga)
  ]);
}
