import React from 'react';
import { translate } from 'react-i18next';
import namedRoutes from '../../../routes';

const pages = {
  [namedRoutes.dashboard]: 'dashboard',
  [namedRoutes.transactions]: 'transactions',
  [namedRoutes.referrals]: 'partnerProgram',
  [namedRoutes.sendTokens]: 'sendTokens',
  [namedRoutes.settings]: 'settings',
  [namedRoutes.verification]: 'kycVerification',
  [namedRoutes.verificationSuccess]: 'kycVerification',
  [namedRoutes.verificationFailure]: 'kycVerification'
};

const Pagename = ({ t, pathname }) => (<span>{t(pages[pathname])}</span>);

const TranslatedComponent = translate('app')(Pagename);

export default TranslatedComponent;
