import { from } from 'seamless-immutable';
import { createReducer, createSubmitAction, createAction } from '../../../utils/actions';

export const SIGN_UP = 'auth/signUp/SIGN_UP';
export const CONFIRM_EMAIL = 'auth/signUp/CONFIRM_EMAIL';
export const END_SIGNUP = 'auth/signUp/END_SIGNUP';
export const RESET_STORE = 'auth/signUp/RESET_STORE';

export const signUp = createSubmitAction(SIGN_UP);
export const confirmEmail = createSubmitAction(CONFIRM_EMAIL);
export const endSignup = createAction(END_SIGNUP);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  step: 'signup',
  email: '',
  verificationId: '',
  wallets: [],
  spinner: false
});

export default createReducer({
  [signUp.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [signUp.SUCCESS]: (state, { payload }) => (
    state.merge({
      email: payload.email,
      verificationId: payload.verification.id,
      spinner: false,
      step: 'pin'
    })
  ),

  [signUp.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [confirmEmail.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [confirmEmail.SUCCESS]: (state, { payload }) => (
    state.merge({
      step: 'wallet',
      spinner: false,
      wallets: payload
    })
  ),

  [confirmEmail.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
