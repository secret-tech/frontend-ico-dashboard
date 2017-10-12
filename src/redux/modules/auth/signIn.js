import { from } from 'seamless-immutable';
import { createReducer, createSubmitAction } from '../../../utils/actions';

export const SIGN_IN = 'auth/signIn/SIGN_IN';
export const VERIFY_SIGN_IN = 'auth/signIn/VERIFY_SIGN_IN';

export const signIn = createSubmitAction(SIGN_IN);
export const verifySignIn = createSubmitAction(VERIFY_SIGN_IN);

const initialState = from({
  spinner: false,
  step: 'signIn',
  accessToken: '',
  isVerified: false,
  verification: {
    verificationId: '',
    consumer: '',
    expiredOn: 0,
    status: 0,
    method: ''
  }
});

export default createReducer({
  [signIn.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [signIn.SUCCESS]: (state, { payload }) => (
    state.merge({
      spinner: false,
      step: 'verify',
      ...payload
    })
  ),

  [signIn.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [verifySignIn.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [verifySignIn.SUCCESS]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [verifySignIn.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  ),
}, initialState);
