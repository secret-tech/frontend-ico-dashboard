import React from 'react';
import { NavLink } from 'react-router-dom';
import { Icon, Popover, Button, Position } from '@blueprintjs/core';
import namedRoutes from '../../../routes';
import NavMenuDropdown from '../NavMenuDropdown';

const Topbar = (props) => {
  const { kyc, logout } = props;

  return (
    <nav className="pt-navbar">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">Dashboard</div>
        <NavLink className="pt-button pt-minimal" to={namedRoutes.dashboard}>
          <Icon icon='dashboard' /><span>Dashboard</span>
        </NavLink>
        <NavLink className="pt-button pt-minimal" to={namedRoutes.transactions}>
          <Icon icon='exchange' /><span>Transactions</span>
        </NavLink>
        <NavLink className="pt-button pt-minimal" to={namedRoutes.referrals}>
          <Icon icon='people' /><span>Partner Program</span>
        </NavLink>
        {/* <Link className="pt-button pt-minimal" to={namedRoutes.sendTokens}>
          <Icon icon='send-to-graph' /><span>Transfer</span>
        </Link> */}
        {!kyc
          ? <a
            className="pt-button pt-minimal"
            href={namedRoutes.verification}>
              <Icon icon='endorsed' /><span>Verification</span>
          </a>
          : null}
      </div>
      <div className="pt-navbar-group pt-align-right">
        <Popover
          content={
            <NavMenuDropdown
              logout={logout} />
          }
          position={Position.BOTTOM_RIGHT}>
          <Button className="pt-minimal" icon="cog" />
        </Popover>
      </div>
    </nav>
  );
};

export default Topbar;
