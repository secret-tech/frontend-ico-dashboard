import { from } from 'seamless-immutable';
import { createReducer, createAction, createSubmitAction } from '../../../utils/actions';

export const OPEN_INIT_CHANGE_PASSWORD_POPUP = 'account/changePassword/OPEN_INIT_CHANGE_PASSWORD_POPUP';
export const CLOSE_INIT_CHANGE_PASSWORD_POPUP = 'account/changePassword/CLOSE_INIT_CHANGE_PASSWORD_POPUP';
export const INIT_CHANGE_PASSWORD = 'account/changePassword/INIT_CHANGE_PASSWORD';
export const OPEN_VERIFY_CHANGE_PASSWORD_POPUP = 'account/changePassword/OPEN_VERIFY_CHANGE_PASSWORD_POPUP';
export const CLOSE_VERIFY_CHANGE_PASSWORD_POPUP = 'account/changePassword/CLOSE_VERIFY_CHANGE_PASSWORD_POPUP';
export const VERIFY_CHANGE_PASSWORD = 'account/changePassword/VERIFY_CHANGE_PASSWORD';
export const RESET_STORE = 'account/changePassword/RESET_STORE';

export const openInitChangePasswordPopup = createAction(OPEN_INIT_CHANGE_PASSWORD_POPUP);
export const closeInitChangePasswordPopup = createAction(CLOSE_INIT_CHANGE_PASSWORD_POPUP);
export const initChangePassword = createSubmitAction(INIT_CHANGE_PASSWORD);
export const openVerifyChangePasswordPopup = createAction(OPEN_VERIFY_CHANGE_PASSWORD_POPUP);
export const closeVerifyChangePasswordPopup = createAction(CLOSE_VERIFY_CHANGE_PASSWORD_POPUP);
export const verifyChangePassword = createSubmitAction(VERIFY_CHANGE_PASSWORD);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  initChangePasswordPopupIsOpen: false,
  verifyChangePasswordPopupIsOpen: false,
  fetching: false,
  oldPassword: '',
  newPassword: '',
  verification: {
    verificationId: '',
    method: 'email'
  }
});

export default createReducer({
  [OPEN_INIT_CHANGE_PASSWORD_POPUP]: (state) => (
    state.merge({
      initChangePasswordPopupIsOpen: true
    })
  ),

  [CLOSE_INIT_CHANGE_PASSWORD_POPUP]: (state) => (
    state.merge({
      initChangePasswordPopupIsOpen: false
    })
  ),

  [OPEN_VERIFY_CHANGE_PASSWORD_POPUP]: (state) => (
    state.merge({
      verifyChangePasswordPopupIsOpen: true
    })
  ),

  [CLOSE_VERIFY_CHANGE_PASSWORD_POPUP]: (state) => (
    state.merge({
      verifyChangePasswordPopupIsOpen: false
    })
  ),

  [initChangePassword.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [initChangePassword.SUCCESS]: (state, { payload }) => (
    state.merge({
      fetching: false,
      ...payload
    })
  ),

  [initChangePassword.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [verifyChangePassword.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [verifyChangePassword.SUCCESS]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [verifyChangePassword.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
