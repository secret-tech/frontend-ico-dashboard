import React from 'react';
import { translate } from 'react-i18next';

const pages = {
  '/dashboard': 'dashboard',
  '/dashboard/transactions': 'transactions',
  '/dashboard/partners-program': 'partnerProgram',
  '/dashboard/send-tokens': 'sendTokens',
  '/dashboard/account': 'account',
  '/dashboard/verification': 'kycVerification',
  '/dashboard/verification/success': 'kycVerification',
  '/dashboard/verification/failure': 'kycVerification'
};

const Pagename = ({ t, pathname }) => (<span>{t(pages[pathname])}</span>);

const TranslatedComponent = translate('app')(Pagename);

export default TranslatedComponent;
