import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction } from '../../../utils/actions';

export const FETCH_FEE = 'dashboard/txFee/FETCH_FEE';

export const fetchFee = createAsyncAction(FETCH_FEE);

const initialState = from({
  fetching: false,
  gasPrice: '',
  gas: '',
  expectedTxFee: '',
  minInvest: ''
});

export default createReducer({
  [fetchFee.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [fetchFee.SUCCESS]: (state, { payload }) => (
    state.merge({
      fetching: false,
      ...payload
    })
  ),

  [fetchFee.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),
}, initialState);
