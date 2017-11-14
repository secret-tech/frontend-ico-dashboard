import React from 'react';
import { connect } from 'react-redux';

import { signUp, confirmEmail, endSignup } from '../../../redux/modules/auth/signUp';

import SignUpForm from '../../../components/auth/SignUpForm';
import ConfirmEmailForm from '../../../components/auth/ConfirmEmailForm';
import WalletData from '../../../components/auth/WalletData';

const SignUp = (props) => {
  const {
    step,
    spinner,
    verificationId,
    email,
    accessToken,
    wallets,
    params: {
      referralCode
    },
    endSignup
  } = props;

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
        return <div>Something went wrong</div>;
    }
  };

  return renderStep(step);
};

export default connect(
  (state) => ({
    ...state.auth.signUp
  }),
  {
    endSignup
  }
)(SignUp);
