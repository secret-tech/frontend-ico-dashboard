import { from } from 'seamless-immutable';
import { createReducer, createAsyncAction } from '../../../utils/actions';

export const INIT_VERIFICATION = 'verification/verification/INIT_VERIFICATION';

export const initVerification = createAsyncAction(INIT_VERIFICATION);

const initialState = from({
  timestamp: 0,
  authorizationToken: '',
  clientRedirectUrl: '',
  jumioIdScanReference: '',
  error: ''
});

export default createReducer({
  [initVerification.SUCCESS]: (state, { payload }) => (
    state.merge({
      ...payload
    })
  ),

  [initVerification.FAILURE]: (state, { payload }) => (
    state.merge({
      error: payload.error
    })
  )
}, initialState);
