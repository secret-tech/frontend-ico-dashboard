import { from } from 'seamless-immutable';
import { createReducer, createAction, createSubmitAction } from '../../../utils/actions';

export const RESTORE_PASSWORD = 'auth/restorePassword/RESTORE_PASSWORD';
export const CONFIRM_PIN = 'auth/restorePassword/CONFIRM_PIN';
export const NEW_PASSWORD = 'auth/restorePassword/NEW_PASSWORD';
export const RESET_STORE = 'auth/restorePassword/RESET_STORE';

export const restorePassword = createSubmitAction(RESTORE_PASSWORD);
export const confirmPin = createSubmitAction(CONFIRM_PIN);
export const newPassword = createSubmitAction(NEW_PASSWORD);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  step: 'email',
  spinner: true
});

export default createReducer({
  [restorePassword.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [restorePassword.SUCCESS]: (state) => (
    state.merge({
      spinner: false,
      step: 'pin'
    })
  ),

  [restorePassword.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [confirmPin.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [confirmPin.SUCCESS]: (state) => (
    state.merge({
      spinner: false,
      step: 'password'
    })
  ),

  [confirmPin.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [newPassword.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [newPassword.SUCCESS]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [newPassword.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
