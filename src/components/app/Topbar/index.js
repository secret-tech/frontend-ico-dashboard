import React from 'react';
import { Link, NavLink } from 'react-router-dom';
import { Icon } from '@blueprintjs/core';
import namedRoutes from '../../../routes';

const Topbar = (props) => {
  const { kyc } = props;

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
        <Link className="pt-button pt-minimal" to={namedRoutes.account}>
          <Icon icon='user' />
        </Link>
      </div>
    </nav>
  );
};

export default Topbar;
