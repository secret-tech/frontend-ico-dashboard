import { from } from 'seamless-immutable';
import { createReducer, createAction, createSubmitAction } from '../../../utils/actions';

export const CHANGE_ETH = 'dashboard/buyTokens/CHANGE_ETH';
export const SET_ETH = 'dashboard/buyTokens/SET_ETH';
export const CHANGE_JCR = 'dashboard/buyTokens/CHANGE_JCR';
export const SET_JCR = 'dashboard/buyTokens/SET_JCR';
export const INITIATE_BUY_TOKENS = 'dashboard/buyTokens/INITIATE_BUY_TOKENS';
export const OPEN_MNEMONIC_POPUP = 'dashboard/buyTokens/OPEN_MNEMONIC_POPUP';
export const CLOSE_MNEMONIC_POPUP = 'dashboard/buyTokens/CLOSE_MNEMONIC_POPUP';
export const SET_MNEMONIC = 'dashboard/buyTokens/SET_MNEMONIC';
export const SET_ETH_AMOUNT = 'dashboard/buyTokens/SET_ETH_AMOUNT';
export const OPEN_VERIFY_POPUP = 'dashboard/buyTokens/OPEN_VERIFY_POPUP';
export const CLOSE_VERIFY_POPUP = 'dashboard/buyTokens/CLOSE_VERIFY_POPUP';
export const VERIFY_BUY_TOKENS = 'dashboard/buyTokens/VERIFY_BUY_TOKENS';
export const RESET_STORE = 'dashboard/buyTokens/RESET_STORE';

export const changeEth = createAction(CHANGE_ETH);
export const setEth = createAction(SET_ETH);
export const changeJcr = createAction(CHANGE_JCR);
export const setJcr = createAction(SET_JCR);
export const openMnemonicPopup = createAction(OPEN_MNEMONIC_POPUP);
export const closeMnemonicPopup = createAction(CLOSE_MNEMONIC_POPUP);
export const setMnemonic = createAction(SET_MNEMONIC);
export const setEthAmount = createAction(SET_ETH_AMOUNT);
export const initiateBuyTokens = createSubmitAction(INITIATE_BUY_TOKENS);
export const openVerifyPopup = createAction(OPEN_VERIFY_POPUP);
export const closeVerifyPopup = createAction(CLOSE_VERIFY_POPUP);
export const verifyBuyTokens = createSubmitAction(VERIFY_BUY_TOKENS);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  spinner: false,
  jcr: '',
  eth: '',
  verifyPopupOpen: false,
  mnemonicPopupOpen: false,
  mnemonic: '',
  ethAmount: '',
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

  [initiateBuyTokens.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [initiateBuyTokens.SUCCESS]: (state, { payload }) => (
    state.merge({
      spinner: false,
      verification: payload,
      verifyPopupOpen: true
    })
  ),

  [initiateBuyTokens.FAILURE]: (state) => (
    state.merge({
      spinner: false
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

  [SET_MNEMONIC]: (state, { payload }) => (
    state.merge({
      mnemonic: payload
    })
  ),

  [SET_ETH_AMOUNT]: (state, { payload }) => (
    state.merge({
      ethAmount: payload
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

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
