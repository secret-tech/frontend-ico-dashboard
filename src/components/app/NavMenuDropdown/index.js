import React from 'react';
import { Menu, MenuItem, MenuDivider, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { NavLink } from 'react-router-dom';
import namedRoutes from '../../../routes';

const NavMenuDropdown = ({ logout }) => (
  <Menu>
    <li>
      <NavLink
        to={namedRoutes.settings}
        className="pt-popover-dismiss pt-menu-item"
        tabIndex="0">
        <Icon icon={IconNames.COG}/>
        <span>Settings...</span>
      </NavLink>
    </li>

    <MenuDivider />

    <MenuItem
      icon="log-out"
      text="Logout"
      onClick={() => logout()}/>
  </Menu>
);

export default NavMenuDropdown;
