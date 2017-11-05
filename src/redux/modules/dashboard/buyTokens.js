import { from } from 'seamless-immutable';
import { createReducer, createAction, createAsyncAction } from '../../../utils/actions';

export const CHANGE_ETH = 'dashboard/buyTokens/CHANGE_ETH';
export const SET_ETH = 'dashboard/buyTokens/SET_ETH';
export const CHANGE_JCR = 'dashboard/buyTokens/CHANGE_JCR';
export const SET_JCR = 'dashboard/buyTokens/SET_JCR';

export const changeEth = createAction(CHANGE_ETH);
export const setEth = createAction(SET_ETH);
export const changeJcr = createAction(CHANGE_JCR);
export const setJcr = createAction(SET_JCR);

const initialState = from({
  jcr: '',
  eth: ''
});

export default createReducer({
  [SET_ETH]: (state, { payload }) => (
    state.merge({
      eth: payload
    })
  ),

  [SET_JCR]: (state, { payload }) => (
    state.merge({
      jcr: payload
    })
  )
}, initialState);
