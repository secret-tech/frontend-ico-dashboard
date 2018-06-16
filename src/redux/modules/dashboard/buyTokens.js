import { from } from 'seamless-immutable';
import { createReducer, createAction, createSubmitAction } from '../../../utils/actions';

export const CHANGE_ETH = 'dashboard/buyTokens/CHANGE_ETH';
export const OPEN_MNEMONIC_POPUP = 'dashboard/buyTokens/OPEN_MNEMONIC_POPUP';
export const CLOSE_MNEMONIC_POPUP = 'dashboard/buyTokens/CLOSE_MNEMONIC_POPUP';
export const INITIATE_BUY_TOKENS = 'dashboard/buyTokens/INITIATE_BUY_TOKENS';


export const changeEth = createAction(CHANGE_ETH);
export const openMnemonicPopup = createAction(OPEN_MNEMONIC_POPUP);
export const closeMnemonicPopup = createAction(CLOSE_MNEMONIC_POPUP);
export const initiateBuyTokens = createSubmitAction(INITIATE_BUY_TOKENS);


export const SET_ETH = 'dashboard/buyTokens/SET_ETH';
export const SET_TOKENS = 'dashboard/buyTokens/SET_TOKENS';
export const SET_MNEMONIC = 'dashboard/buyTokens/SET_MNEMONIC';
export const SET_ETH_AMOUNT = 'dashboard/buyTokens/SET_ETH_AMOUNT';
export const OPEN_VERIFY_POPUP = 'dashboard/buyTokens/OPEN_VERIFY_POPUP';
export const CLOSE_VERIFY_POPUP = 'dashboard/buyTokens/CLOSE_VERIFY_POPUP';
export const VERIFY_BUY_TOKENS = 'dashboard/buyTokens/VERIFY_BUY_TOKENS';
export const RESET_STORE = 'dashboard/buyTokens/RESET_STORE';


export const setEth = createAction(SET_ETH);
export const setTokens = createAction(SET_TOKENS);
export const setMnemonic = createAction(SET_MNEMONIC);
export const setEthAmount = createAction(SET_ETH_AMOUNT);
export const openVerifyPopup = createAction(OPEN_VERIFY_POPUP);
export const closeVerifyPopup = createAction(CLOSE_VERIFY_POPUP);
export const verifyBuyTokens = createSubmitAction(VERIFY_BUY_TOKENS);
export const resetStore = createAction(RESET_STORE);


const initialState = from({
  fetching: false,
  eth: '',
  mnemonicPopupIsOpen: false,
  initiateContributionSubmitting: false,
  verification: {
    verificationId: '',
    method: 'email'
  },

  tokens: '',
  verifyPopupOpen: false,
  mnemonicPopupOpen: false,
  mnemonic: '',
  ethAmount: ''
});

export default createReducer({
  [CHANGE_ETH]: (state, { payload }) => (
    state.merge({
      eth: payload
    })
  ),

  [OPEN_MNEMONIC_POPUP]: (state) => (
    state.merge({
      mnemonicPopupIsOpen: true
    })
  ),

  [CLOSE_MNEMONIC_POPUP]: (state) => (
    state.merge({
      mnemonicPopupIsOpen: false
    })
  ),

  [initiateBuyTokens.REQUEST]: (state) => (
    state.merge({
      initiateContributionSubmitting: true
    })
  ),

  [initiateBuyTokens.SUCCESS]: (state, { payload }) => (
    state.merge({
      initiateContributionSubmitting: false,
      verification: payload
    })
  ),

  [initiateBuyTokens.FAILURE]: (state) => (
    state.merge({
      initiateContributionSubmitting: false
    })
  ),

  // [SET_MNEMONIC]: (state, { payload }) => (
  //   state.merge({
  //     mnemonic: payload
  //   })
  // ),
  //
  // [SET_ETH_AMOUNT]: (state, { payload }) => (
  //   state.merge({
  //     ethAmount: payload
  //   })
  // ),

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
