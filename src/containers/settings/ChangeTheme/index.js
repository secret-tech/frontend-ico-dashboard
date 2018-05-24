import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ButtonGroup, Button } from '@blueprintjs/core';

import { changeTheme } from '../../../redux/modules/app/theme';

import { THEMES } from '../../../utils/theme';
import s from './styles.scss';

const ChangeTheme = (props) => {
  const {
    t,
    theme,
    changeTheme
  } = props;

  return (
    <div>
      <ButtonGroup large={false}>
        <Button
          icon="moon"
          text={t('changeTheme.dark')}
          className={theme === THEMES.dark ? 'pt-active' : null}
          onClick={() => changeTheme(THEMES.dark)}/>

        <Button
          icon="flash"
          text={t('changeTheme.light')}
          className={theme === THEMES.light ? 'pt-active' : null}
          onClick={() => changeTheme(THEMES.light)}/>
      </ButtonGroup>

      <div className={s.tip}>{t('changeTheme.tip')}</div>
    </div>
  );
};

const TranslatedComponent = translate('settings')(ChangeTheme);
export default connect(
  (state) => ({ ...state.app.theme }),
  {
    changeTheme
  }
)(TranslatedComponent);
