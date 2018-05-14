import { all, takeLatest, call, fork, put } from 'redux-saga/effects';
import { getThemeFromStorage, setThemeToStorage } from '../../utils/theme';

import { setThemeState, setTheme, CHANGE_THEME, CHECK_THEME_STATE, SET_THEME } from '../../redux/modules/app/theme';


function* checkThemeStateIterator() {
  const theme = yield call(getThemeFromStorage);
  if (theme) {
    yield put(setThemeState(theme));
  } else {
    yield put(setThemeState(''));
  }
}

function* checkThemeSaga() {
  yield takeLatest(
    CHECK_THEME_STATE,
    checkThemeStateIterator
  );
}


function* setThemeIterator({ payload }) {
  yield call(setThemeToStorage, payload);
  yield put(setThemeState(payload));
}

function* setThemeStateSaga() {
  yield takeLatest(
    SET_THEME,
    setThemeIterator
  );
}


function* changeThemeIterator({ payload }) {
  yield put(setTheme(payload));
}

function* changeThemeSaga() {
  yield takeLatest(
    CHANGE_THEME,
    changeThemeIterator
  );
}


export default function* () {
  yield all([
    fork(checkThemeSaga),
    fork(setThemeStateSaga),
    fork(changeThemeSaga)
  ]);
}
