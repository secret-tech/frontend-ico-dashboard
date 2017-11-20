import { from } from 'seamless-immutable';
import { createReducer, createAction } from '../../../utils/actions';

export const TOGGLE_SIDEBAR = 'app/sidebar/TOGGLE_SIDEBAR';
export const OPEN_SIDEBAR = 'app/sidebar/OPEN_SIDEBAR';
export const CLOSE_SIDEBAR = 'app/sidebar/CLOSE_SIDEBAR';

export const toggleSidebar = createAction(TOGGLE_SIDEBAR);
export const openSidebar = createAction(OPEN_SIDEBAR);
export const closeSidebar = createAction(CLOSE_SIDEBAR);

const initialState = from({
  open: false
});

export default createReducer({
  [OPEN_SIDEBAR]: (state) => (
    state.merge({
      open: true
    })
  ),

  [CLOSE_SIDEBAR]: (state) => (
    state.merge({
      open: false
    })
  ),

  [TOGGLE_SIDEBAR]: (state) => (
    state.merge({
      open: !state.app.sidebar.open
    })
  )
}, initialState);
