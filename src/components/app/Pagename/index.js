import React from 'react';

const pages = {
  '/dashboard': 'Dashboard',
  '/dashboard/transactions': 'Transactions',
  '/dashboard/referrals': 'Referral Program',
  '/dashboard/send-tokens': 'Send Tokens',
  '/dashboard/account': 'Account'
};

const Pagename = ({ pathname }) => (<span>{pages[pathname]}</span>);

export default Pagename;
