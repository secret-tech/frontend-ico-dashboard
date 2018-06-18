import React from 'react';
import { translate } from 'react-i18next';
import { Menu, MenuItem } from '@blueprintjs/core';

const LanguageDropdown = ({ i18n }) => (
  <Menu>
    <MenuItem
      icon={<img
        style={{ width: '16px' }}
        src={require('../../../assets/images/icons/flags/en.svg')}/>}
      text="English"
      onClick={() => i18n.changeLanguage('en')}/>

    <MenuItem
      icon={<img
        style={{ width: '16px' }}
        src={require('../../../assets/images/icons/flags/ru.svg')}/>}
      text="Russian"
      onClick={() => i18n.changeLanguage('ru')}/>
  </Menu>
);

const TranslatedComponent = translate()(LanguageDropdown);
export default TranslatedComponent;
