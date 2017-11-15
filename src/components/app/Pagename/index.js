import React from 'react';

const pages = {
  '/dashboard': 'Dashboard',
  '/dashboard/transactions': 'Transactions',
  '/dashboard/partners-program': 'Partner Program',
  '/dashboard/send-tokens': 'Send Tokens',
  '/dashboard/account': 'Account',
  '/dashboard/verification': 'KYC Verification',
  '/dashboard/verification/success': 'KYC Verification',
  '/dashboard/verification/failure': 'KYC Verification'
};

const Pagename = ({ pathname }) => (<span>{pages[pathname]}</span>);

export default Pagename;
