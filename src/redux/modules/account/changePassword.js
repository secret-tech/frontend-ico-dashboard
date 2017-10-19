import { from } from 'seamless-immutable';
import { createReducer, createAction, createSubmitAction } from '../../../utils/actions';

export const OPEN_CHANGE_PASSWORD_POPUP = 'app/changePassword/OPEN_CHANGE_PASSWORD_POPUP';
export const CLOSE_CHANGE_PASSWORD_POPUP = 'app/changePassword/CLOSE_CHANGE_PASSWORD_POPUP';
export const CHANGE_PASSWORD = 'app/changePassword/CHANGE_PASSWORD';
export const OPEN_VERIFY_CHANGE_PASSWORD_POPUP = 'app/changePassword/OPEN_VERIFY_CHANGE_PASSWORD_POPUP';
export const CLOSE_VERIFY_CHANGE_PASSWORD_POPUP = 'app/changePassword/CLOSE_VERIFY_CHANGE_PASSWORD_POPUP';
export const VERIFY_CHANGE_PASSWORD = 'app/changePassword/VERIFY_CHANGE_PASSWORD';

export const openChangePasswordPopup = createAction(OPEN_CHANGE_PASSWORD_POPUP);
export const closeChangePasswordPopup = createAction(CLOSE_CHANGE_PASSWORD_POPUP);
export const changePassword = createSubmitAction(CHANGE_PASSWORD);
export const openVerifyChangePasswordPopup = createAction(OPEN_VERIFY_CHANGE_PASSWORD_POPUP);
export const closeVerifyChangePasswordPopup = createAction(CLOSE_VERIFY_CHANGE_PASSWORD_POPUP);
export const verifyChangePassword = createSubmitAction(VERIFY_CHANGE_PASSWORD);

const initialState = from({
  changePasswordPopupOpen: false,
  verifyPopupOpen: false,
  spinner: false,
  oldPassword: '',
  newPassword: '',
  verificationId: ''
});

export default createReducer({
  [OPEN_CHANGE_PASSWORD_POPUP]: (state) => (
    state.merge({
      changePasswordPopupOpen: true
    })
  ),

  [CLOSE_CHANGE_PASSWORD_POPUP]: (state) => (
    state.merge({
      changePasswordPopupOpen: false
    })
  ),

  [OPEN_VERIFY_CHANGE_PASSWORD_POPUP]: (state) => (
    state.merge({
      verifyPopupOpen: true
    })
  ),

  [CLOSE_VERIFY_CHANGE_PASSWORD_POPUP]: (state) => (
    state.merge({
      verifyPopupOpen: false
    })
  ),

  [changePassword.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [changePassword.SUCCESS]: (state, { payload }) => (
    state.merge({
      spinner: false,
      changePasswordPopupOpen: false,
      verifyPopupOpen: true,
      oldPassword: payload.oldPassword,
      newPassword: payload.newPassword,
      verificationId: payload.verification.verificationId
    })
  ),

  [changePassword.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [verifyChangePassword.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [verifyChangePassword.SUCCESS]: (state) => (
    state.merge({
      spinner: false,
      verifyPopupOpen: false
    })
  ),

  [verifyChangePassword.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  )
}, initialState);
