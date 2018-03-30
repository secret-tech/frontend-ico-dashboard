import React from 'react';
import { Icon } from '@blueprintjs/core';

const Topbar = () => (
  <nav class="pt-navbar pt-dark">
    <div class="pt-navbar-group pt-align-left">
      <div class="pt-navbar-heading">Dashboard</div>
      <button class="pt-button pt-minimal"><Icon icon='dashboard'/><span>Dashboard</span></button>
      <button class="pt-button pt-minimal"><Icon icon='exchange'/><span>Transactions</span></button>
      <button class="pt-button pt-minimal"><Icon icon='send-to-graph'/><span>Transfer</span></button>
    </div>
    <div class="pt-navbar-group pt-align-right">
      <button class="pt-button pt-minimal">
        <Icon icon='cog'/>
      </button>
    </div>
  </nav>
);

export default Topbar;
