import { from } from 'seamless-immutable';
import { createReducer, createAction, createSubmitAction } from '../../../utils/actions';

export const INIT_RESET_PASSWORD = 'auth/resetPassword/INIT_RESET_PASSWORD';
export const VERIFY_RESET_PASSWORD = 'auth/resetPassword/VERIFY_RESET_PASSWORD';
export const CHANGE_STEP = 'auth/restorePassword/CHANGE_STEP';
export const RESET_STORE = 'auth/restorePassword/RESET_STORE';

export const initResetPassword = createSubmitAction(INIT_RESET_PASSWORD);
export const verifyResetPassword = createSubmitAction(VERIFY_RESET_PASSWORD);
export const changeStep = createAction(CHANGE_STEP);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  step: 'initResetPassword',
  fetching: false,
  email: '',
  verification: {
    verificationId: '',
    method: ''
  }
});

export default createReducer({
  [initResetPassword.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [initResetPassword.SUCCESS]: (state, { payload }) => (
    state.merge({
      fetching: false,
      email: payload.email,
      verification: {
        verificationId: payload.verification.verificationId,
        method: payload.verification.method
      }
    })
  ),

  [initResetPassword.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [verifyResetPassword.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [verifyResetPassword.SUCCESS]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [verifyResetPassword.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [CHANGE_STEP]: (state, { payload }) => (
    state.merge({
      step: payload
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
