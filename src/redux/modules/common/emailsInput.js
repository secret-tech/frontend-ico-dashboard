import { from } from 'seamless-immutable';
import { createReducer, createAction } from '../../../utils/actions';

export const CHANGE_VALUE = 'common/emailTextarea/CHANGE_VALUE';
export const ADD_EMAILS = 'common/emailTextarea/ADD_EMAILS';
export const REMOVE_LAST_EMAIL = 'common/emailTextarea/REMOVE_LAST_EMAIL';
export const SET_INPUT_WIDTH = 'common/emailTextarea/SET_INPUT_WIDTH';
export const VALIDATE_EMAIL = 'common/emailTextarea/VALIDATE_EMAIL';
export const KEY_PRESS = 'common/emailTextarea/KEY_PRESS';
export const SELECT_EMAIL = 'common/emailTextarea/SELECT_EMAIL';
export const UNSELECT_EMAIL = 'common/emailTextarea/UNSELECT_EMAIL';
export const REMOVE_EMAIL = 'common/emailTextarea/REMOVE_EMAIL';
export const HANDLE_EMAIL_REMOVE = 'common/emailTextarea/HANDLE_EMAIL_REMOVE';
export const SET_VALIDATE_STATE = 'common/emailTextarea/SET_VALIDATE_STATE';
export const RESET_TEXTAREA = 'common/emailTextarea/RESET_TEXTAREA';

export const changeValue = createAction(CHANGE_VALUE);
export const addEmails = createAction(ADD_EMAILS);
export const removeLastEmail = createAction(REMOVE_LAST_EMAIL);
export const setInputWidth = createAction(SET_INPUT_WIDTH);
export const validateEmail = createAction(VALIDATE_EMAIL);
export const keyPress = createAction(KEY_PRESS);
export const selectEmail = createAction(SELECT_EMAIL);
export const unselectEmail = createAction(UNSELECT_EMAIL);
export const removeEmail = createAction(REMOVE_EMAIL);
export const handleEmailRemove = createAction(HANDLE_EMAIL_REMOVE);
export const setValidateState = createAction(SET_VALIDATE_STATE);
export const resetTextarea = createAction(RESET_TEXTAREA);

const initialState = from({
  valid: false,
  selectedEmail: null,
  value: '',
  emails: [],
  inputWidth: 0
});

export default createReducer({
  [CHANGE_VALUE]: (state, { payload }) => (
    state.merge({ value: payload })
  ),

  [ADD_EMAILS]: (state, { payload }) => (
    state.merge({
      emails: [...state.emails, ...payload],
      value: '',
      inputWidth: 15
    })
  ),

  [REMOVE_LAST_EMAIL]: (state) => (
    state.merge({
      emails: state.emails.slice(0, -1)
    })
  ),

  [SET_INPUT_WIDTH]: (state, { payload }) => (
    state.merge({ inputWidth: payload })
  ),

  [SELECT_EMAIL]: (state, { payload }) => (
    state.merge({ selectedEmail: payload })
  ),

  [UNSELECT_EMAIL]: (state) => (
    state.merge({ selectedEmail: null })
  ),

  [REMOVE_EMAIL]: (state, { payload: index }) => (
    state.merge({
      emails: [
        ...state.emails.slice(0, index),
        ...state.emails.slice(index + 1)
      ]
    })
  ),

  [SET_VALIDATE_STATE]: (state, { payload }) => (
    state.merge({ valid: payload })
  ),

  [RESET_TEXTAREA]: (state) => (
    state.merge(initialState)
  )
}, initialState);
