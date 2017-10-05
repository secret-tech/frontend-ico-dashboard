import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import { reducer as formReducer } from 'redux-form';

import app from './modules/app/app';

import signIn from './modules/auth/signIn';
import restorePassword from './modules/auth/restorePassword';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  app: combineReducers({
    app
  }),

  auth: combineReducers({
    signIn,
    restorePassword
  })
});
