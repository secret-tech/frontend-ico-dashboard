import { from } from 'seamless-immutable';
import { createReducer, createAction } from '../../../utils/actions';

export const OPEN_EDIT_ACCOUNT_POPUP = 'app/editAccount/OPEN_EDIT_ACCOUNT_POPUP';
export const CLOSE_EDIT_ACCOUNT_POPUP = 'app/editAccount/CLOSE_EDIT_ACCOUNT_POPUP';

export const openEditAccountPopup = createAction(OPEN_EDIT_ACCOUNT_POPUP);
export const closeEditAccountPopup = createAction(CLOSE_EDIT_ACCOUNT_POPUP);

const initialState = from({
  open: false
});

export default createReducer({
  [OPEN_EDIT_ACCOUNT_POPUP]: (state) => (
    state.merge({
      open: true
    })
  ),

  [CLOSE_EDIT_ACCOUNT_POPUP]: (state) => (
    state.merge({
      open: false
    })
  )
}, initialState);
