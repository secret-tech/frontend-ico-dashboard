import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction, createAction, createSubmitAction } from '../../../utils/actions';

export const OPEN_DISABLE_2FA_POPUP = 'account/disableTwoFactorAuth/OPEN_DISABLE_2FA_POPUP';
export const CLOSE_DISABLE_2FA_POPUP = 'account/disableTwoFactorAuth/CLOSE_DISABLE_2FA_POPUP';
export const INITIATE_DISABLE_2FA = 'account/disableTwoFactorAuth/INITIATE_DISABLE_2FA';
export const VERIFY_DISABLE_2FA = 'account/disableTwoFactorAuth/VERIFY_DISABLE_2FA';
export const RESET_STORE = 'account/disableTwoFactorAuth/RESET_STORE';

export const openDisableTwoFactorAuthPopup = createAction(OPEN_DISABLE_2FA_POPUP);
export const closeDisableTwoFactorAuthPopup = createAction(CLOSE_DISABLE_2FA_POPUP);
export const initiateDisableTwoFactorAuth = createAsyncAction(INITIATE_DISABLE_2FA);
export const verifyDisableTwoFactorAuth = createSubmitAction(VERIFY_DISABLE_2FA);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  disableTwoFactorAuthPopupOpen: false,
  spinner: false,
  verification: {
    verificationId: '',
    consumer: '',
    expiredOn: 0,
    status: 0,
    method: ''
  }
});

export default createReducer({
  [OPEN_DISABLE_2FA_POPUP]: (state) => (
    state.merge({
      disableTwoFactorAuthPopupOpen: true
    })
  ),

  [CLOSE_DISABLE_2FA_POPUP]: (state) => (
    state.merge({
      disableTwoFactorAuthPopupOpen: false
    })
  ),

  [initiateDisableTwoFactorAuth.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [initiateDisableTwoFactorAuth.SUCCESS]: (state, { payload }) => (
    state.merge({
      spinner: false,
      verification: payload
    })
  ),

  [initiateDisableTwoFactorAuth.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [verifyDisableTwoFactorAuth.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [verifyDisableTwoFactorAuth.SUCCESS]: (state) => (
    state.merge({
      disableTwoFactorAuthPopupOpen: false,
      spinner: false
    })
  ),

  [verifyDisableTwoFactorAuth.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
