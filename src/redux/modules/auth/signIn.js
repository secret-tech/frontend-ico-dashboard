import { from } from 'seamless-immutable';
import { createReducer, createSubmitAction } from '../../../utils/actions';

export const SIGN_IN = 'auth/signIn/SIGN_IN';

export const signIn = createSubmitAction(SIGN_IN);

const initialState = from({
  spinner: false
});

export default createReducer({
  [signIn.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [signIn.SUCCESS]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [signIn.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  )
}, initialState);
