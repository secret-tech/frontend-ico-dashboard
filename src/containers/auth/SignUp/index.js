import React, { Component } from 'react';
import { connect } from 'react-redux';

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
          return <div>Something went wrong</div>;
      }
    };

    return renderStep(step);
  }
}

export default connect(
  (state) => ({
    ...state.auth.signUp
  }),
  {
    endSignup,
    changeStep,
    setActivationData
  }
)(SignUp);
