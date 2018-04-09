import { from } from 'seamless-immutable';
import { createReducer, createSubmitAction, createAction } from '../../../utils/actions';

export const INIT_SIGN_IN = 'auth/signIn/INIT_SIGN_IN';
export const VERIFY_SIGN_IN = 'auth/signIn/VERIFY_SIGN_IN';
export const CHANGE_STEP = 'auth/signIn/CHANGE_STEP';
export const RESET_STORE = 'auth/signIn/RESET_STORE';

export const initSignIn = createSubmitAction(INIT_SIGN_IN);
export const verifySignIn = createSubmitAction(VERIFY_SIGN_IN);
export const changeStep = createAction(CHANGE_STEP);
export const resetStore = createAction(RESET_STORE);

const initialState = from({
  step: 'initSignIn',
  fetching: false,
  accessToken: '',
  verification: {
    verificationId: '',
    method: ''
  }
});

export default createReducer({
  [initSignIn.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [initSignIn.SUCCESS]: (state, { payload }) => (
    state.merge({
      fetching: false,
      accessToken: payload.accessToken,
      verification: {
        verificationId: payload.verification.verificationId,
        method: payload.verification.method
      }
    })
  ),

  [initSignIn.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [verifySignIn.REQUEST]: (state) => (
    state.merge({
      fetching: true
    })
  ),

  [verifySignIn.SUCCESS]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [verifySignIn.FAILURE]: (state) => (
    state.merge({
      fetching: false
    })
  ),

  [CHANGE_STEP]: (state, { payload }) => (
    state.merge({
      step: payload
    })
  ),

  [RESET_STORE]: (state) => (
    state.merge(initialState)
  )
}, initialState);
