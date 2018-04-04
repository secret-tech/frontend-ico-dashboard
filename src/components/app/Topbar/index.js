import React from 'react';
import { Link, IndexLink } from 'react-router';
import { Icon } from '@blueprintjs/core';
import { namedRoutes } from '../../../routes';

const Topbar = (props) => {
  const { kyc } = props;

  return (
    <nav className="pt-navbar">
      <div className="pt-navbar-group pt-align-left">
        <div className="pt-navbar-heading">Dashboard</div>
        <IndexLink className="pt-button pt-minimal" to={namedRoutes.dashboard}>
          <Icon icon='dashboard' /><span>Dashboard</span>
        </IndexLink>
        <Link className="pt-button pt-minimal" to={namedRoutes.transactions}>
          <Icon icon='exchange' /><span>Transactions</span>
        </Link>
        <Link className="pt-button pt-minimal" to={namedRoutes.referrals}>
          <span>Partner Program</span>
        </Link>
        <Link className="pt-button pt-minimal" to={namedRoutes.sendTokens}>
          <Icon icon='send-to-graph' /><span>Transfer</span>
        </Link>
        {!kyc
          ? <a
            className="pt-button pt-minimal"
            href={namedRoutes.verification}>
            <span>Verification</span>
          </a>
          : null}
      </div>
      <div className="pt-navbar-group pt-align-right">
        <Link className="pt-button pt-minimal" to={namedRoutes.account}>
          <Icon icon='cog' />
        </Link>
      </div>
    </nav>
  );
};

export default Topbar;
