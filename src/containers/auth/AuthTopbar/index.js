import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import windowDimensions from 'react-window-dimensions';
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
    width,
    i18n,
    changeTheme,
    theme
  } = props;

  const renderLanguageButton = () => {
    switch (i18n.language) {
      case 'ru': return <Button minimal icon={<img style={{ width: '16px' }} src={require('../../../assets/images/icons/flags/ru.svg')}/>}/>;
      default: return <Button minimal icon={<img style={{ width: '16px' }} src={require('../../../assets/images/icons/flags/en.svg')}/>}/>;
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
          {width > 800 && t('authWrapper.back')}
        </AnchorButton>
      </div>

      <div>
        <ButtonGroup large={false}>
          <Button
            minimal
            icon="moon"
            text={width > 800 && t('common:themes.dark')}
            className={classnames(theme === THEMES.dark && 'pt-active')}
            onClick={() => changeTheme(THEMES.dark)}/>

          <Button
            minimal
            icon="flash"
            text={width > 800 && t('common:themes.light')}
            className={classnames(theme === THEMES.light && 'pt-active')}
            onClick={() => changeTheme(THEMES.light)}/>
        </ButtonGroup>

        <Popover
          content={<LanguageDropdown/>}
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

const ComponentWithDemensions = windowDimensions()(ConnectedComponent);
const TranslatedComponent = translate('app')(ComponentWithDemensions);
export default TranslatedComponent;
