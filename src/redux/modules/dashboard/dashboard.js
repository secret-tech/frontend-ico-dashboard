import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction } from '../../../utils/actions';

export const FETCH_DASHBOARD = 'dashboard/dashboard/FETCH_DASHBOARD';

export const fetchDashboard = createAsyncAction(FETCH_DASHBOARD);

const initialState = from({
  fetching: false,
  daysLeft: 0,
  ethBalance: '',
  raised: {
    BTC: '',
    ETH: '',
    USD: ''
  },
  tokenBalance: '',
  tokenPrice: {
    ETH: '',
    USD: ''
  },
  tokensSold: ''
});

export default createReducer({
  [fetchDashboard.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [fetchDashboard.SUCCESS]: (state, { payload }) => (
    state.merge({
      fetching: false,
      ...payload
    })
  ),

  [fetchDashboard.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),
}, initialState);
