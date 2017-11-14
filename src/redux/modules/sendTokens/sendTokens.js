import { from } from 'seamless-immutable';
import { createReducer, createAction, createSubmitAction } from '../../../utils/actions';

export const OPEN_MNEMONIC_POPUP = 'sendTokens/sendTokens/OPEN_MNEMONIC_POPUP';
export const CLOSE_MNEMONIC_POPUP = 'sendTokens/sendTokens/CLOSE_MNEMONIC_POPUP';
export const SET_MNEMONIC_PHRASE = 'sendTokens/sendTokens/SET_MNEMONIC_PHRASE';
export const INITIATE_SEND_TOKENS = 'sendTokens/sendTokens/INITIATE_SEND_TOKENS';
export const OPEN_VERIFY_POPUP = 'sendTokens/sendTokens/OPEN_VERIFY_POPUP';
export const CLOSE_VERIFY_POPUP = 'sendTokens/sendTokens/CLOSE_VERIFY_POPUP';
export const VERIFY_SEND_TOKENS = 'sendTokens/sendTokens/VERIFY_SEND_TOKENS';
export const RESET_STATE = 'sendTokens/sendTokens/RESET_STATE';

export const openMnemonicPopup = createAction(OPEN_MNEMONIC_POPUP);
export const closeMnemonicPopup = createAction(CLOSE_MNEMONIC_POPUP);
export const setMnemonicPhrase = createAction(SET_MNEMONIC_PHRASE);
export const initiateSendTokens = createSubmitAction(INITIATE_SEND_TOKENS);
export const openVerifyPopup = createAction(OPEN_VERIFY_POPUP);
export const closeVerifyPopup = createAction(CLOSE_VERIFY_POPUP);
export const verifySendTokens = createSubmitAction(VERIFY_SEND_TOKENS);
export const resetState = createAction(RESET_STATE);

const initialState = from({
  spinner: false,
  mnemonicPopupOpen: false,
  verifyPopupOpen: false,
  mnemonicPhrase: '',
  verification: {
    verificationId: '',
    consumer: '',
    expiredOn: 0,
    status: 0,
    method: 'email'
  }
});

export default createReducer({
  [OPEN_MNEMONIC_POPUP]: (state) => (
    state.merge({
      mnemonicPopupOpen: true
    })
  ),

  [CLOSE_MNEMONIC_POPUP]: (state) => (
    state.merge({
      mnemonicPopupOpen: false
    })
  ),

  [SET_MNEMONIC_PHRASE]: (state, { payload }) => (
    state.merge({
      mnemonicPhrase: payload
    })
  ),

  [initiateSendTokens.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [initiateSendTokens.SUCCESS]: (state, { payload }) => (
    state.merge({
      spinner: false,
      verification: payload,
      mnemonicPopupOpen: false,
      verifyPopupOpen: true
    })
  ),

  [initiateSendTokens.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [OPEN_VERIFY_POPUP]: (state) => (
    state.merge({
      verifyPopupOpen: true
    })
  ),

  [CLOSE_VERIFY_POPUP]: (state) => (
    state.merge({
      verifyPopupOpen: false
    })
  ),

  [verifySendTokens.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [verifySendTokens.SUCCESS]: (state) => (
    state.merge({
      spinner: false,
      verifyPopupOpen: false
    })
  ),

  [verifySendTokens.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [RESET_STATE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
