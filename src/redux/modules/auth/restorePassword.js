import { from } from 'seamless-immutable';
import { createReducer, createAction, createSubmitAction } from '../../../utils/actions';

export const INITIATE_RESTORE_PASSWORD = 'auth/restorePassword/INITIATE_RESTORE_PASSWORD';
export const SET_PIN = 'auth/restorePassword/SET_PIN';
export const VERIFY_RESTORE_PASSWORD = 'auth/restorePassword/VERIFY_RESTORE_PASSWORD';
export const RESET_STORE = 'auth/restorePassword/RESET_STORE';

export const initiateRestorePassword = createSubmitAction(INITIATE_RESTORE_PASSWORD);
export const setPin = createSubmitAction(SET_PIN);
export const verifyRestorePassword = createSubmitAction(VERIFY_RESTORE_PASSWORD);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  step: 'email',
  spinner: false,
  email: '',
  code: '',
  verification: {
    verificationId: '',
    consumer: '',
    expiredOn: 0,
    status: 0,
    method: ''
  }
});

export default createReducer({
  [initiateRestorePassword.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [initiateRestorePassword.SUCCESS]: (state, { payload }) => (
    state.merge({
      spinner: false,
      step: 'pin',
      email: payload.email,
      verification: payload.verification
    })
  ),

  [initiateRestorePassword.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [setPin.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [setPin.SUCCESS]: (state, { payload }) => (
    state.merge({
      spinner: false,
      code: payload,
      step: 'password'
    })
  ),

  [setPin.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [verifyRestorePassword.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [verifyRestorePassword.SUCCESS]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [verifyRestorePassword.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
