import { from } from 'seamless-immutable';
import { createReducer, createAction } from '../../../utils/actions';

/**
 * Constants
 */

export const INCREMENT = 'app/app/INCREMENT';
export const DECREMENT = 'app/app/DECREMENT';

/**
 * Action creators
 */

export const increment = createAction(INCREMENT);
export const decrement = createAction(DECREMENT);

/**
 * Reducer
 */

const initialState = from({
  counter: 0
});

export default createReducer({
  [INCREMENT]: (state) => (
    state.merge({ counter: state.counter + 1 })
  ),

  [DECREMENT]: (state) => (
    state.merge({ counter: state.counter - 1 })
  )
}, initialState);
