import React from 'react';
import { connect } from 'react-redux';

import RPEmailForm from '../../../components/auth/RPEmailForm';
import RPPinForm from '../../../components/auth/RPPinForm';
import RPPasswordForm from '../../../components/auth/RPPasswordForm';

const RestorePassword = (props) => {
  const { step, spinner } = props;

  const renderStep = (currentStep) => {
    switch (currentStep) {
      case 'email':
        return <RPEmailForm spinner={spinner}/>;
      case 'pin':
        return <RPPinForm spinner={spinner}/>;
      case 'password':
        return <RPPasswordForm spinner={spinner}/>;
      default:
        return <RPEmailForm spinner={spinner}/>;
    }
  };

  return renderStep(step);
};

export default connect(
  (state) => ({ ...state.auth.restorePassword }),
  {}
)(RestorePassword);
