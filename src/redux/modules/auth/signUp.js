import { from } from 'seamless-immutable';
import { createReducer, createSubmitAction, createAction } from '../../../utils/actions';

export const INIT_SIGN_UP = 'auth/signUp/INIT_SIGN_UP';
export const INFO_SIGN_UP = 'auth/signUp/INFO_SIGN_UP';
export const VERIFY_SIGN_UP = 'auth/signUp/VERIFY_SIGN_UP';
export const CLOSE_WALLET_CREDS = 'auth/signUp/CLOSE_WALLET_CREDS';
export const CHANGE_STEP = 'auth/signUp/CHANGE_STEP';
export const RESET_STORE = 'auth/signUp/RESET_STORE';

export const initSignUp = createSubmitAction(INIT_SIGN_UP);
export const infoSignUp = createSubmitAction(INFO_SIGN_UP);
export const verifySignUp = createSubmitAction(VERIFY_SIGN_UP);
export const closeWalletCreds = createAction(CLOSE_WALLET_CREDS);
export const changeStep = createAction(CHANGE_STEP);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  step: 'initSignUp',
  fetching: false,
  email: '',
  password: '',
  referral: '',
  agreeTos: false,
  verification: {
    verificationId: '',
    method: 'email'
  },
  accessToken: '',
  wallets: [
    {
      ticker: '',
      address: '',
      balance: '',
      mnemonic: '',
      privateKey: ''
    }
  ]
});

export default createReducer({
  [initSignUp.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [initSignUp.SUCCESS]: (state, { payload }) => (
    state.merge({
      fetching: false,
      email: payload.email,
      password: payload.password,
      referral: payload.referral,
      agreeTos: payload.agreeTos
    })
  ),

  [initSignUp.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [infoSignUp.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [infoSignUp.SUCCESS]: (state, { payload }) => (
    state.merge({
      fetching: false,
      email: payload.email,
      verification: {
        verificationId: payload.verification.id,
        method: payload.verification.method
      }
    })
  ),

  [infoSignUp.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [verifySignUp.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [verifySignUp.SUCCESS]: (state, { payload }) => (
    state.merge({
      fetching: false,
      accessToken: payload.accessToken,
      wallets: payload.wallets
    })
  ),

  [verifySignUp.FAILURE]: (state) => (
    state.merge({
      spinner: false
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
