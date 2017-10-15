import { from } from 'seamless-immutable';
import { createReducer, createAction } from '../../../utils/actions';

export const OPEN_MAKE_DEPOSIT_POPUP = 'app/makeDepositPopup/OPEN_MAKE_DEPOSIT_POPUP';
export const CLOSE_MAKE_DEPOSIT_POPUP = 'app/makeDepositPopup/CLOSE_MAKE_DEPOSIT_POPUP';

export const openMakeDepositPopup = createAction(OPEN_MAKE_DEPOSIT_POPUP);
export const closeMakeDepositPopup = createAction(CLOSE_MAKE_DEPOSIT_POPUP);

const initialState = from({
  open: false
});

export default createReducer({
  [OPEN_MAKE_DEPOSIT_POPUP]: (state) => (
    state.merge({
      open: true
    })
  ),

  [CLOSE_MAKE_DEPOSIT_POPUP]: (state) => (
    state.merge({
      open: false
    })
  )
}, initialState);
