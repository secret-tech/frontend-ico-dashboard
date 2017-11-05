import { from } from 'seamless-immutable';
import { createReducer, createAction, createAsyncAction, createSubmitAction } from '../../../utils/actions';

export const CHANGE_ETH = 'dashboard/buyTokens/CHANGE_ETH';
export const SET_ETH = 'dashboard/buyTokens/SET_ETH';
export const CHANGE_JCR = 'dashboard/buyTokens/CHANGE_JCR';
export const SET_JCR = 'dashboard/buyTokens/SET_JCR';
export const OPEN_MNEMONIC_POPUP = 'dashboard/buyTokens/OPEN_MNEMONIC_POPUP';
export const CLOSE_MNEMONIC_POPUP = 'dashboard/buyTokens/CLOSE_MNEMONIC_POPUP';
export const SET_MNEMONIC_PHRASE = 'dashboard/buyTokens/SET_MNEMONIC_PHRASE';
export const INITIATE_BUY_TOKENS = 'dashboard/buyTokens/INITIATE_BUY_TOKENS';
export const OPEN_VERIFY_POPUP = 'dashboard/buyTokens/OPEN_VERIFY_POPUP';
export const CLOSE_VERIFY_POPUP = 'dashboard/buyTokens/CLOSE_VERIFY_POPUP';
export const VERIFY_BUY_TOKENS = 'dashboard/buyTokens/VERIFY_BUY_TOKENS';
export const RESET_STATE = 'dashboard/buyTokens/RESET_STATE';

export const changeEth = createAction(CHANGE_ETH);
export const setEth = createAction(SET_ETH);
export const changeJcr = createAction(CHANGE_JCR);
export const setJcr = createAction(SET_JCR);
export const openMnemonicPopup = createAction(OPEN_MNEMONIC_POPUP);
export const closeMnemonicPopup = createAction(CLOSE_MNEMONIC_POPUP);
export const setMnemonicPhrase = createAction(SET_MNEMONIC_PHRASE);
export const initiateBuyTokens = createSubmitAction(INITIATE_BUY_TOKENS);
export const openVerifyPopup = createAction(OPEN_VERIFY_POPUP);
export const closeVerifyPopup = createAction(CLOSE_VERIFY_POPUP);
export const verifyBuyTokens = createSubmitAction(VERIFY_BUY_TOKENS);
export const resetState = createAction(RESET_STATE);

const initialState = from({
  spinner: false,
  jcr: '',
  eth: '',
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
  [SET_ETH]: (state, { payload }) => (
    state.merge({
      eth: payload
    })
  ),

  [SET_JCR]: (state, { payload }) => (
    state.merge({
      jcr: payload
    })
  ),

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

  [initiateBuyTokens.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [initiateBuyTokens.SUCCESS]: (state, { payload }) => (
    state.merge({
      spinner: false,
      verification: payload,
      mnemonicPopupOpen: false,
      verifyPopupOpen: true
    })
  ),

  [initiateBuyTokens.FAILURE]: (state) => (
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

  [verifyBuyTokens.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [verifyBuyTokens.SUCCESS]: (state) => (
    state.merge({
      spinner: false,
      verifyPopupOpen: false
    })
  ),

  [verifyBuyTokens.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [RESET_STATE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
