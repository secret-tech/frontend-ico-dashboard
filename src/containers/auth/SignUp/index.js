import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { getCookie, parseGTM } from '../../../utils/cookies';

import {
  signUp,
  confirmEmail,
  endSignup,
  changeStep,
  setActivationData
} from '../../../redux/modules/auth/signUp';

import SignUpForm from '../../../components/auth/SignUpForm';
import ConfirmEmailForm from '../../../components/auth/ConfirmEmailForm';
import WalletData from '../../../components/auth/WalletData';

class SignUp extends Component {
  componentWillMount() {
    const {
      location: {
        query
      },
      changeStep,
      setActivationData
    } = this.props;

    /* marketing tags */
    const gtm = parseGTM(getCookie('_ga'));

    if (query.utm_source && query.utm_medium && query.utm_campaign) {
      window.localStorage.setItem('utm_source', query.utm_source);
      window.localStorage.setItem('utm_medium', query.utm_medium);
      window.localStorage.setItem('utm_campaign', query.utm_campaign);
    }

    if (gtm) {
      window.localStorage.setItem('gtm', gtm);
    }
    /* marketing tags */

    if (query.type === 'activate') {
      setActivationData({
        email: query.email,
        verificationId: query.verificationId,
        code: query.code
      });

      changeStep('pin');
    }
  }

  render() {
    const {
      t,
      step,
      spinner,
      verificationId,
      email,
      accessToken,
      wallets,
      code,
      params: {
        referralCode
      },
      endSignup
    } = this.props;

    const renderStep = (currentStep) => {
      switch (currentStep) {
        case 'signup':
          return (
            <SignUpForm
              spinner={spinner}
              onSubmit={signUp}
              referralCode={referralCode}/>
          );

        case 'pin':
          return (
            <ConfirmEmailForm
              code={code}
              spinner={spinner}
              onSubmit={confirmEmail}
              email={email}
              verificationId={verificationId}/>
          );

        case 'wallet':
          return (
            <WalletData
              accessToken={accessToken}
              wallets={wallets}
              endSignup={endSignup}/>
          );

        default:
          return <div>{t('somethingWentWrong')}</div>;
      }
    };

    return renderStep(step);
  }
}

const TranslatedComponent = translate('auth')(SignUp);

export default connect(
  (state) => ({
    ...state.auth.signUp
  }),
  {
    endSignup,
    changeStep,
    setActivationData
  }
)(TranslatedComponent);
