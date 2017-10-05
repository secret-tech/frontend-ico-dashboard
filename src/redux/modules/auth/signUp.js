import { from } from 'seamless-immutable';
import { createReducer, createSubmitAction } from '../../../utils/actions';

export const SIGN_UP = 'auth/signIn/SIGN_UP';

export const signUp = createSubmitAction(SIGN_UP);

const initialState = from({
  spinner: false
});

export default createReducer({
  [signUp.REQUEST]: (state) => (
    state.merge({
      spinner: true
    })
  ),

  [signUp.SUCCESS]: (state) => (
    state.merge({
      spinner: false
    })
  ),

  [signUp.FAILURE]: (state) => (
    state.merge({
      spinner: false
    })
  )
}, initialState);
