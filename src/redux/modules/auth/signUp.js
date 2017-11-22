import { from } from 'seamless-immutable';
import { createReducer, createSubmitAction, createAction } from '../../../utils/actions';

export const SIGN_UP = 'auth/signUp/SIGN_UP';
export const CONFIRM_EMAIL = 'auth/signUp/CONFIRM_EMAIL';
export const END_SIGNUP = 'auth/signUp/END_SIGNUP';
export const RESET_STORE = 'auth/signUp/RESET_STORE';
export const CHANGE_STEP = 'auth/signUp/CHANGE_STEP';
export const SET_ACTIVATION_DATA = 'auth/signUp/SET_ACTIVATION_DATA';

export const signUp = createSubmitAction(SIGN_UP);
export const confirmEmail = createSubmitAction(CONFIRM_EMAIL);
export const endSignup = createAction(END_SIGNUP);
export const resetStore = createAction(RESET_STORE);
export const changeStep = createAction(CHANGE_STEP);
export const setActivationData = createAction(SET_ACTIVATION_DATA);

const initialState = from({
  step: 'signup',
  email: '',
  verificationId: '',
  accessToken: '',
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
      ...payload
    })
  ),

  [confirmEmail.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [SET_ACTIVATION_DATA]: (state, { payload }) => (
    state.merge({
      email: payload.email,
      verificationId: payload.verificationId,
      code: payload.code
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
