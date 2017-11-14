import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction, createAction, createSubmitAction } from '../../../utils/actions';

export const OPEN_ENABLE_2FA_POPUP = 'account/enableTwoFactorAuth/OPEN_ENABLE_2FA_POPUP';
export const CLOSE_ENABLE_2FA_POPUP = 'account/enableTwoFactorAuth/CLOSE_ENABLE_2FA_POPUP';
export const INITIATE_ENABLE_2FA = 'account/enableTwoFactorAuth/INITIATE_ENABLE_2FA';
export const VERIFY_ENABLE_2FA = 'account/enableTwoFactorAuth/VERIFY_ENABLE_2FA';
export const RESET_STORE = 'account/enableTwoFactorAuth/RESET_STORE';

export const openEnableTwoFactorAuthPopup = createAction(OPEN_ENABLE_2FA_POPUP);
export const closeEnableTwoFactorAuthPopup = createAction(CLOSE_ENABLE_2FA_POPUP);
export const initiateEnableTwoFactorAuth = createAsyncAction(INITIATE_ENABLE_2FA);
export const verifyEnableTwoFactorAuth = createSubmitAction(VERIFY_ENABLE_2FA);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  enableTwoFactorAuthPopupOpen: false,
  spinner: false,
  verification: {
    verificationId: '',
    consumer: '',
    expiredOn: '',
    totpUri: '',
    status: 0,
    method: '',
    qrPngDataUri: ''
  }
});

export default createReducer({
  [OPEN_ENABLE_2FA_POPUP]: (state) => (
    state.merge({
      enableTwoFactorAuthPopupOpen: true
    })
  ),

  [CLOSE_ENABLE_2FA_POPUP]: (state) => (
    state.merge({
      enableTwoFactorAuthPopupOpen: false
    })
  ),

  [initiateEnableTwoFactorAuth.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [initiateEnableTwoFactorAuth.SUCCESS]: (state, { payload }) => (
    state.merge({
      spinner: false,
      verification: payload
    })
  ),

  [initiateEnableTwoFactorAuth.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [verifyEnableTwoFactorAuth.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [verifyEnableTwoFactorAuth.SUCCESS]: (state) => (
    state.merge({
      enableTwoFactorAuthPopupOpen: false,
      spinner: false
    })
  ),

  [verifyEnableTwoFactorAuth.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
