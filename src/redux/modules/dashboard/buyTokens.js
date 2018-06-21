import { from } from 'seamless-immutable';
import { createReducer, createAction, createSubmitAction } from '../../../utils/actions';

export const CHANGE_ETH = 'dashboard/buyTokens/CHANGE_ETH';
export const OPEN_MNEMONIC_POPUP = 'dashboard/buyTokens/OPEN_MNEMONIC_POPUP';
export const CLOSE_MNEMONIC_POPUP = 'dashboard/buyTokens/CLOSE_MNEMONIC_POPUP';
export const INITIATE_BUY_TOKENS = 'dashboard/buyTokens/INITIATE_BUY_TOKENS';
export const OPEN_VERIFY_POPUP = 'dashboard/buyTokens/OPEN_VERIFY_POPUP';
export const CLOSE_VERIFY_POPUP = 'dashboard/buyTokens/CLOSE_VERIFY_POPUP';
export const VERIFY_BUY_TOKENS = 'dashboard/buyTokens/VERIFY_BUY_TOKENS';
export const RESET_STORE = 'dashboard/buyTokens/RESET_STORE';


export const changeEth = createAction(CHANGE_ETH);
export const openMnemonicPopup = createAction(OPEN_MNEMONIC_POPUP);
export const closeMnemonicPopup = createAction(CLOSE_MNEMONIC_POPUP);
export const initiateBuyTokens = createSubmitAction(INITIATE_BUY_TOKENS);
export const openVerifyPopup = createAction(OPEN_VERIFY_POPUP);
export const closeVerifyPopup = createAction(CLOSE_VERIFY_POPUP);
export const verifyBuyTokens = createSubmitAction(VERIFY_BUY_TOKENS);
export const resetStore = createAction(RESET_STORE);


const initialState = from({
  fetching: false,
  eth: '',
  mnemonic: '',
  mnemonicPopupIsOpen: false,
  verifyPopupIsOpen: false,
  verification: {
    verificationId: '',
    method: 'email'
  }
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

  [initiateBuyTokens.REQUEST]: (state, { payload }) => (
    state.merge({
      fetching: true,
      mnemonic: payload.mnemonic
    })
  ),

  [initiateBuyTokens.SUCCESS]: (state, { payload }) => (
    state.merge({
      fetching: false,
      verification: payload.verification,
      mnemonic: payload.data.mnemonic
    })
  ),

  [initiateBuyTokens.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [OPEN_VERIFY_POPUP]: (state) => (
    state.merge({
      verifyPopupIsOpen: true
    })
  ),

  [CLOSE_VERIFY_POPUP]: (state) => (
    state.merge({
      verifyPopupIsOpen: false
    })
  ),

  [verifyBuyTokens.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [verifyBuyTokens.SUCCESS]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [verifyBuyTokens.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
