import React from 'react';
import { translate } from 'react-i18next';
import windowDimensions from 'react-window-dimensions';
import { NavLink } from 'react-router-dom';
import { Icon, Popover, Button, Position } from '@blueprintjs/core';
import * as routes from '../../../routes';
import NavMenuDropdown from '../NavMenuDropdown';

const Topbar = (props) => {
  const {
    t,
    width,
    kyc,
    logout
  } = props;

  const renderNavItems = () => {
    if (width < 980) return null;

    return (
      <div>
        <NavLink className="pt-button pt-minimal" key={routes.DASHBOARD} to={routes.DASHBOARD}>
          <Icon icon='dashboard'/><span>{t('topbar.nav.dashboard')}</span>
        </NavLink>
        <NavLink className="pt-button pt-minimal" key={routes.TRANSACTIONS} to={routes.TRANSACTIONS}>
          <Icon icon='exchange'/><span>{t('topbar.nav.txs')}</span>
        </NavLink>
        <NavLink className="pt-button pt-minimal" key={routes.REFERRALS} to={routes.REFERRALS}>
          <Icon icon='people'/><span>{t('topbar.nav.referral')}</span>
        </NavLink>
        {!kyc
          ? (
            <NavLink className="pt-button pt-minimal" to={routes.KYC_VERIFICATION}>
              <Icon icon='endorsed'/><span>{t('topbar.nav.verification')}</span>
            </NavLink>
          )
          : null}
      </div>
    );
  };

  return (
    <nav className="pt-navbar">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">{t('topbar.brand')}</div>
        {renderNavItems()}
      </div>
      <div className="pt-navbar-group pt-align-right">
        <Popover
          content={<NavMenuDropdown logout={logout} kyc={kyc}/>}
          position={Position.BOTTOM_RIGHT}>
          <Button className="pt-minimal" icon="more" />
        </Popover>
      </div>
    </nav>
  );
};

const ComponentWithDemensions = windowDimensions()(Topbar);
const TranslatedComponent = translate('app')(ComponentWithDemensions);
export default TranslatedComponent;
