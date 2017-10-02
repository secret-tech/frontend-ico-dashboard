export const createAction = (type) => (payload) => ({ type, payload });
export const createMetaAction = (type) => (meta, payload) => ({ type, payload, meta });
export const createAsyncAction = (type) => {
  const REQUEST = `${type}_REQUEST`;
  const SUCCESS = `${type}_SUCCESS`;
  const FAILURE = `${type}_FAILURE`;

  return Object.assign(createAction(REQUEST), {
    success: createAction(SUCCESS),
    failure: createAction(FAILURE),
    REQUEST,
    SUCCESS,
    FAILURE,
    type
  });
};

export const createReducer = (handlers, initialState) =>
  (state = initialState, action = null) =>
    (handlers[action.type]
      ? handlers[action.type](state, action)
      : state);
