import { from } from 'seamless-immutable';
import { createReducer, createAction } from '../../../utils/actions';

export const CHANGE_THEME = 'app/theme/CHANGE_THEME';
export const CHECK_THEME_STATE = 'app/theme/CHECK_THEME_STATE';
export const SET_THEME_STATE = 'app/theme/SET_THEME_STATE';
export const SET_THEME = 'app/theme/SET_THEME';

export const changeTheme = createAction(CHANGE_THEME);
export const checkThemeState = createAction(CHECK_THEME_STATE);
export const setThemeState = createAction(SET_THEME_STATE);
export const setTheme = createAction(SET_THEME);

const initialState = from({
  theme: ''
});

export default createReducer({
  [SET_THEME_STATE]: (state, { payload }) => (
    state.merge({
      theme: payload
    })
  )
}, initialState);
