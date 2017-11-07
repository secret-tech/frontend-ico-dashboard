import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction } from '../../../utils/actions';

export const FETCH_TRANSACTIONS = 'transactions/transactions/FETCH_TRANSACTIONS';

export const fetchTransactions = createAsyncAction(FETCH_TRANSACTIONS);

const initialState = from({
  transactions: []
});

export default createReducer({
  [fetchTransactions.SUCCESS]: (state, { payload }) => (
    state.merge({
      transactions: payload
    })
  )
}, initialState);
