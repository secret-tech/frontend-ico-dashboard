import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { ButtonGroup, Button, AnchorButton, Popover, Position } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import classnames from 'classnames/bind';

import { changeTheme } from '../../../redux/modules/app/theme';

import LanguageDropdown from '../../../components/app/LanguageDropdown';

import config from '../../../utils/config';
import { THEMES } from '../../../utils/theme';
import s from './styles.scss';

const Topbar = (props) => {
  const {
    t,
    i18n,
    changeTheme,
    theme
  } = props;

  const changeLanguage = (language) => i18n.changeLanguage(language);

  const renderLanguageButton = () => {
    switch (i18n.language) {
      case 'en':
        return (
          <Button
            className="pt-minimal"
            icon={<img style={{ width: '16px' }} src={require('../../../assets/images/icons/flags/en.svg')}/>}
            text="EN"/>
        );
      case 'ru':
        return (
          <Button
            className="pt-minimal"
            icon={<img style={{ width: '16px' }} src={require('../../../assets/images/icons/flags/ru.svg')}/>}
            text="RU"/>
        );
      default:
        return null;
    }
  };

  return (
    <div className={s.topbar}>
      <div>
        <AnchorButton
          href={config.landingPageDomain}
          className="pt-minimal"
          tabIndex="0"
          icon={IconNames.CHEVRON_LEFT}>
          {t('authWrapper.back')}
        </AnchorButton>
      </div>

      <div>
        <ButtonGroup large={false}>
          <Button
            icon="moon"
            text={t('common:themes.dark')}
            className={classnames(theme === THEMES.dark ? 'pt-active' : null, 'pt-minimal')}
            onClick={() => changeTheme(THEMES.dark)}/>

          <Button
            icon="flash"
            text={t('common:themes.light')}
            className={classnames(theme === THEMES.light ? 'pt-active' : null, 'pt-minimal')}
            onClick={() => changeTheme(THEMES.light)}/>
        </ButtonGroup>

        <Popover
          content={
            <LanguageDropdown
              language={i18n.language}
              changeLanguage={changeLanguage}/>
          }
          position={Position.TOP_RIGHT}>
          {renderLanguageButton()}
        </Popover>
      </div>
    </div>
  );
};

const ConnectedComponent = connect(
  (state) => ({ ...state.app.theme }),
  { changeTheme }
)(Topbar);

const TranslatedComponent = translate('app')(ConnectedComponent);
export default TranslatedComponent;
