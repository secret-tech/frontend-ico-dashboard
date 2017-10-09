import React from 'react';
import { connect } from 'react-redux';

import { signUp, confirmEmail } from '../../../redux/modules/auth/signUp';

import SignUpForm from '../../../components/auth/SignUpForm';
import ConfirmEmailForm from '../../../components/auth/ConfirmEmailForm';

const SignUp = (props) => {
  const {
    step,
    spinner,
    verificationId, // set store after signup submit
    params: {
      referralCode
    }
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
            verificationId={verificationId}/>
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
  })
)(SignUp);
