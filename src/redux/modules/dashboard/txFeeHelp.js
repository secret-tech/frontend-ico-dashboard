import { from } from 'seamless-immutable';
import { createReducer, createAction } from '../../../utils/actions';

export const OPEN_TX_FEE_HELP = 'dashboard/txFeeHelp/OPEN_TX_FEE_HELP';
export const CLOSE_TX_FEE_HELP = 'dashbaord/txFeeHelp/CLOSE_TX_FEE_HELP';

export const openTxFeeHelp = createAction(OPEN_TX_FEE_HELP);
export const closeTxFeeHelp = createAction(CLOSE_TX_FEE_HELP);

const initialState = from({
  open: false
});

export default createReducer({
  [OPEN_TX_FEE_HELP]: (state) => (
    state.merge({
      open: true
    })
  ),

  [CLOSE_TX_FEE_HELP]: (state) => (
    state.merge({
      open: false
    })
  )
}, initialState);
