import { from } from 'seamless-immutable';
import { createReducer, createAction, createAsyncAction } from '../../../utils/actions';

export const CHANGE_TAB = 'referrals/referrals/CHANGE_TAB';
export const FETCH_REFERRALS = 'referrals/referrals/FETCH_REFERRALS';

export const changeTab = createAction(CHANGE_TAB);
export const fetchReferrals = createAsyncAction(FETCH_REFERRALS);

const initialState = from({
  tab: 'dateSort',
  refCode: '',
  referralCount: 0,
  users: []
});

export default createReducer({
  [CHANGE_TAB]: (state, { payload }) => (
    state.merge({
      tab: payload
    })
  ),

  [fetchReferrals.SUCCESS]: (state, { payload }) => (
    state.merge({
      refCode: payload.data,
      referralCount: payload.referralCount,
      users: payload.users
    })
  )
}, initialState);
