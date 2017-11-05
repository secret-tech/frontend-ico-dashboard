import { takeEvery, put, fork, select, call } from 'redux-saga/effects';

import {
  addEmails,
  changeValue,
  removeLastEmail,
  removeEmail,
  unselectEmail,
  setValidateState,
  validateEmail,
  HANDLE_EMAIL_REMOVE,
  VALIDATE_EMAIL
} from '../../redux/modules/common/emailsInput';

import { canGetEmails, getEmails, isEmail } from '../../helpers/common/emailsInput';

const getState = (state) => state.common.emailsInput;

/**
 * Take email from string or change value
 */
function* validateEmailIterator({ payload }) {
  const { valid, emails } = yield select(getState);

  if (!valid && (isEmail(payload) || emails.length)) {
    yield put(setValidateState(true));
  }

  if (valid && !(isEmail(payload) || emails.length)) {
    yield put(setValidateState(false));
  }

  if (canGetEmails(payload) && emails.length <= 5) {
    const emails = yield call(getEmails, payload);

    yield put(addEmails(emails));
    yield put(changeValue(''));
  } else {
    yield put(changeValue(payload));
  }
}

export function* validateEmailSaga() {
  yield takeEvery(
    VALIDATE_EMAIL,
    validateEmailIterator
  );
}

/**
 * Handle backspace
 */
function* handleBackspaceIterator({ payload: btnKey }) {
  const { selectedEmail, value } = yield select(getState);

  if (btnKey === 'Backspace') {
    if (selectedEmail != null) {
      yield put(removeEmail(selectedEmail));
      yield put(unselectEmail());
    } else if (!value) {
      yield put(removeLastEmail());
    }
  }

  if (btnKey === 'Delete') {
    if (selectedEmail != null) {
      yield put(removeEmail(selectedEmail));
      yield put(unselectEmail());
    }
  }

  yield put(validateEmail(value));
}

export function* handleBackspaceSaga() {
  yield takeEvery(
    HANDLE_EMAIL_REMOVE,
    handleBackspaceIterator
  );
}

/**
 * Email textarea saga
 */
export default function* () {
  yield [
    fork(validateEmailSaga),
    fork(handleBackspaceSaga)
  ];
}
