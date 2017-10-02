import { combineReducers, routerReducer } from 'redux-seamless-immutable';
import { reducer as formReducer } from 'redux-form';

import app from './modules/app/app';

export default combineReducers({
  routing: routerReducer,
  form: formReducer,

  app: combineReducers({
    app
  })
});
