import { from } from 'seamless-immutable';
import { createReducer, createAction } from '../../../utils/actions';

export const CHANGE_TAB = 'referrals/users/CHANGE_TAB';

export const changeTab = createAction(CHANGE_TAB);

const initialState = from({
  tab: 'dateSort'
});

export default createReducer({
  [CHANGE_TAB]: (state, { payload }) => (
    state.merge({ tab: payload })
  )
}, initialState);
