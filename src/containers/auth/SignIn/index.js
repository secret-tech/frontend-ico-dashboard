import React from 'react';
import { connect } from 'react-redux';

import { signIn, verifySignIn } from '../../../redux/modules/auth/signIn';

import SignInForm from '../../../components/auth/SignInForm';
import VerifySignIn from '../../../components/auth/VerifySignIn';

const SignIn = (props) => {
  const {
    step,
    spinner,
    accessToken,
    verification
  } = props;

  const {
    verificationId,
    method
  } = verification;

  const renderStep = (currentStep) => {
    switch (currentStep) {
      case 'signIn':
        return (
          <SignInForm
            spinner={spinner}
            onSubmit={signIn}/>
        );

      case 'verify':
        return (
          <VerifySignIn
            spinner={spinner}
            onSubmit={verifySignIn}
            accessToken={accessToken}
            method={method}
            verificationId={verificationId}/>
        );

      default:
        return <div>Something went wrong</div>;
    }
  };

  return renderStep(step);
};

export default connect((state) => ({
  ...state.auth.signIn
}))(SignIn);
