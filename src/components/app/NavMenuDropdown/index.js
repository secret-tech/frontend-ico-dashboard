import React from 'react';
import { translate } from 'react-i18next';
import { Menu, MenuItem, MenuDivider, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { NavLink } from 'react-router-dom';
import * as routes from '../../../routes';

const NavMenuDropdown = ({ t, logout }) => (
  <Menu>
    <li>
      <NavLink
        to={routes.SETTINGS}
        className="pt-popover-dismiss pt-menu-item"
        tabIndex="0">
        <Icon icon={IconNames.COG}/>
        <span>{t('navMenuDropdown.settings')}</span>
      </NavLink>
    </li>

    <MenuDivider />

    <MenuItem
      icon="log-out"
      text={t('navMenuDropdown.logout')}
      onClick={() => logout()}/>
  </Menu>
);

const TranslatedComponent = translate('app')(NavMenuDropdown);
export default TranslatedComponent;
