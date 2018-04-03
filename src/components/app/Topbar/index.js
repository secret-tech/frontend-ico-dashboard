import React from 'react';
import { Icon } from '@blueprintjs/core';

const Topbar = () => (
  <nav className="pt-navbar">
    <div className="pt-navbar-group pt-align-left">
      <div className="pt-navbar-heading">Dashboard</div>
      <button className="pt-button pt-minimal"><Icon icon='dashboard'/><span>Dashboard</span></button>
      <button className="pt-button pt-minimal"><Icon icon='exchange'/><span>Transactions</span></button>
      <button className="pt-button pt-minimal"><Icon icon='send-to-graph'/><span>Transfer</span></button>
    </div>
    <div className="pt-navbar-group pt-align-right">
      <button className="pt-button pt-minimal">
        <Icon icon='cog'/>
      </button>
    </div>
  </nav>
);

export default Topbar;
