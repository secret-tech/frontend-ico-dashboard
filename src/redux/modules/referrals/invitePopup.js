import { from } from 'seamless-immutable';
import { createReducer, createAction, createAsyncAction } from '../../../utils/actions';

export const OPEN_INVITE_POPUP = 'referrals/invitePopup/OPEN_INVITE_POPUP';
export const CLOSE_INVITE_POPUP = 'referrals/invitePopup/CLOSE_INVITE_POPUP';
export const INVITE_USERS = 'referrals/invitePopup/INVITE_USERS';

export const openInvitePopup = createAction(OPEN_INVITE_POPUP);
export const closeInvitePopup = createAction(CLOSE_INVITE_POPUP);
export const inviteUsers = createAsyncAction(INVITE_USERS);

const initialState = from({
  spinner: false,
  open: false
});

export default createReducer({
  [OPEN_INVITE_POPUP]: (state) => (
    state.merge({
      open: true
    })
  ),

  [CLOSE_INVITE_POPUP]: (state) => (
    state.merge({
      open: false,
      spinner: false
    })
  ),

  [inviteUsers.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [inviteUsers.SUCCESS]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [inviteUsers.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  )
}, initialState);
