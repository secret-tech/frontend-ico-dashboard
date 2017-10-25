import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction, createAction, createSubmitAction } from '../../../utils/actions';

export const OPEN_ENABLE_2FA_POPUP = 'account/twoFactorAuth/OPEN_ENABLE_2FA_POPUP';
export const CLOSE_ENABLE_2FA_POPUP = 'account/twoFactorAuth/CLOSE_ENABLE_2FA_POPUP';
export const INITIATE_ENABLE_2FA = 'account/twoFactorAuth/INITIATE_ENABLE_2FA';
export const VERIFY_ENABLE_2FA = 'account/twoFactorAuth/VERIFY_ENABLE_2FA';

export const openEnableTwoFactorAuthPopup = createAction(OPEN_ENABLE_2FA_POPUP);
export const closeEnableTwoFactorAuthPopup = createAction(CLOSE_ENABLE_2FA_POPUP);
export const initiateEnableTwoFactorAuth = createAsyncAction(INITIATE_ENABLE_2FA);
export const verifyEnableTwoFactorAuth = createSubmitAction(VERIFY_ENABLE_2FA);

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
  )
}, initialState);
