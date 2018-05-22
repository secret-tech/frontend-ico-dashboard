import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction } from '../../../utils/actions';

export const FETCH_TRANSACTIONS = 'transactions/transactions/FETCH_TRANSACTIONS';

export const fetchTransactions = createAsyncAction(FETCH_TRANSACTIONS);

const initialState = from({
  fetching: false,
  transactions: []
});

export default createReducer({
  [fetchTransactions.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [fetchTransactions.SUCCESS]: (state, { payload }) => (
    state.merge({
      transactions: payload,
      fetching: false
    })
  ),

  [fetchTransactions.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  )
}, initialState);
