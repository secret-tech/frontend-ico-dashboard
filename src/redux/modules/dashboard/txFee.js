import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction } from '../../../utils/actions';

export const FETCH_FEE = 'dashboard/txFee/FETCH_FEE';

export const fetchFee = createAsyncAction(FETCH_FEE);

const initialState = from({
  gasPrice: '',
  gas: '',
  expectedTxFee: '',
  minInvest: ''
});

export default createReducer({
  [fetchFee.SUCCESS]: (state, { payload }) => (
    state.merge({
      ...payload
    })
  )
}, initialState);
