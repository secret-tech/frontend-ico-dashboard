import React from 'react';
import { translate } from 'react-i18next';
import windowDimensions from 'react-window-dimensions';
import { Menu, MenuItem, MenuDivider, Icon } from '@blueprintjs/core';
import { IconNames } from '@blueprintjs/icons';
import { NavLink } from 'react-router-dom';
import * as routes from '../../../routes';

const NavMenuDropdown = (props) => {
  const {
    t,
    logout,
    kyc,
    width
  } = props;

  const renderMenuItems = () => {
    if (width < 980) {
      return (
        <div>
          <li>
            <NavLink
              to={routes.DASHBOARD}
              className="pt-popover-dismiss pt-menu-item"
              tabIndex="0">
              <Icon icon={IconNames.DASHBOARD}/>
              <span>{t('topbar.nav.dashboard')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.TRANSACTIONS}
              className="pt-popover-dismiss pt-menu-item"
              tabIndex="0">
              <Icon icon={IconNames.EXCHANGE}/>
              <span>{t('topbar.nav.txs')}</span>
            </NavLink>
          </li>
          <li>
            <NavLink
              to={routes.REFERRALS}
              className="pt-popover-dismiss pt-menu-item"
              tabIndex="0">
              <Icon icon={IconNames.PEOPLE}/>
              <span>{t('topbar.nav.referral')}</span>
            </NavLink>
          </li>
          {!kyc
            ? (
              <li>
                <NavLink
                  to={routes.KYC_VERIFICATION}
                  className="pt-popover-dismiss pt-menu-item"
                  tabIndex="0">
                  <Icon icon={IconNames.ENDORSED}/>
                  <span>{t('topbar.nav.verification')}</span>
                </NavLink>
              </li>
            )
            : null}
          <li>
            <NavLink
              to={routes.SETTINGS}
              className="pt-popover-dismiss pt-menu-item"
              tabIndex="0">
              <Icon icon={IconNames.COG}/>
              <span>{t('topbar.nav.settings')}</span>
            </NavLink>
          </li>
        </div>
      );
    }

    return (
      <div>
        <li>
          <NavLink
            to={routes.SETTINGS}
            className="pt-popover-dismiss pt-menu-item"
            tabIndex="0">
            <Icon icon={IconNames.COG}/>
            <span>{t('topbar.nav.settings')}</span>
          </NavLink>
        </li>
      </div>
    );
  };

  return (
    <Menu>
      {renderMenuItems()}
      <MenuDivider />
      <MenuItem
        icon="log-out"
        text={t('topbar.nav.logout')}
        onClick={() => logout()}/>
    </Menu>
  );
};

const ComponentWithDemensions = windowDimensions()(NavMenuDropdown);
const TranslatedComponent = translate('app')(ComponentWithDemensions);
export default TranslatedComponent;
