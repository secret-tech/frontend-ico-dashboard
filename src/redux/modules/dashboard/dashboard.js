import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction } from '../../../utils/actions';

export const FETCH_DASHBOARD = 'dashboard/dashboard/FETCH_DASHBOARD';

export const fetchDashboard = createAsyncAction(FETCH_DASHBOARD);

const initialState = from({
  ethBalance: 0,
  jcrTokensSold: 0,
  jcrTokenBalance: 0,
  jcrTokenPrice: {
    ETH: 0,
    USD: 0
  },
  raised: {
    ETH: 0,
    USD: 0,
    BTC: 0
  },
  daysLeft: 0
});

export default createReducer({
  [fetchDashboard.SUCCESS]: (state, { payload }) => (
    state.merge({
      ...payload
    })
  )
}, initialState);
