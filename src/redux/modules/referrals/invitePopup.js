import { from } from 'seamless-immutable';
import { createReducer, createAction } from '../../../utils/actions';

export const OPEN_INVITE_POPUP = 'referrals/invitePopup/OPEN_INVITE_POPUP';
export const CLOSE_INVITE_POPUP = 'referrals/invitePopup/CLOSE_INVITE_POPUP';

export const openInvitePopup = createAction(OPEN_INVITE_POPUP);
export const closeInvitePopup = createAction(CLOSE_INVITE_POPUP);

const initialState = from({
  open: false
});

export default createReducer({
  [OPEN_INVITE_POPUP]: (state) => (
    state.merge({ open: true })
  ),

  [CLOSE_INVITE_POPUP]: (state) => (
    state.merge({ open: false })
  )
}, initialState);
