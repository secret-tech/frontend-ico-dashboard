import React from 'react';
import { translate } from 'react-i18next';
import { NavLink } from 'react-router-dom';
import { Icon, Popover, Button, Position } from '@blueprintjs/core';
import * as routes from '../../../routes';
import NavMenuDropdown from '../NavMenuDropdown';

const Topbar = (props) => {
  const {
    t,
    kyc,
    logout
  } = props;

  return (
    <nav className="pt-navbar">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">{t('topbar.brand')}</div>
        <NavLink className="pt-button pt-minimal" to={routes.DASHBOARD}>
          <Icon icon='dashboard'/><span>{t('topbar.dashboard')}</span>
        </NavLink>
        <NavLink className="pt-button pt-minimal" to={routes.TRANSACTIONS}>
          <Icon icon='exchange'/><span>{t('topbar.txs')}</span>
        </NavLink>
        <NavLink className="pt-button pt-minimal" to={routes.REFERRALS}>
          <Icon icon='people'/><span>{t('topbar.referral')}</span>
        </NavLink>
        {/* <Link className="pt-button pt-minimal" to={routes.WITHDRAW}>
          <Icon icon='send-to-graph'/><span>{t('topbar.transfer')}</span>
        </Link> */}
        {!kyc
          ? (
            <NavLink className="pt-button pt-minimal" to={routes.KYC_VERIFICATION}>
              <Icon icon='endorsed'/><span>{t('topbar.verification')}</span>
            </NavLink>
          )
          : null}
      </div>
      <div className="pt-navbar-group pt-align-right">
        <Popover
          content={<NavMenuDropdown logout={logout}/>}
          position={Position.BOTTOM_RIGHT}>
          <Button className="pt-minimal" icon="cog" />
        </Popover>
      </div>
    </nav>
  );
};

const TranslatedComponent = translate('app')(Topbar);
export default TranslatedComponent;
