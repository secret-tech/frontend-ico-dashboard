import React from 'react';
import { connect } from 'react-redux';

import { initiateRestorePassword, setPin, verifyRestorePassword } from '../../../redux/modules/auth/restorePassword';

import RestorePasswordEmailForm from '../../../components/auth/RestorePasswordEmailForm';
import RestorePasswordPinForm from '../../../components/auth/RestorePasswordPinForm';
import RestorePasswordNewPasswordForm from '../../../components/auth/RestorePasswordNewPasswordForm';

const RestorePassword = (props) => {
  const {
    step,
    spinner,
    code,
    email,
    verification
  } = props;

  const renderStep = (currentStep) => {
    switch (currentStep) {
      case 'email':
        return (
          <RestorePasswordEmailForm
            spinner={spinner}
            onSubmit={initiateRestorePassword}/>
        );
      case 'pin':
        return (
          <RestorePasswordPinForm
            spinner={spinner}
            onSubmit={setPin}/>
        );
      case 'password':
        return (
          <RestorePasswordNewPasswordForm
            spinner={spinner}
            code={code}
            email={email}
            verification={verification}
            onSubmit={verifyRestorePassword}/>
        );
      default:
        return (
          <RestorePasswordEmailForm
            spinner={spinner}
            onSubmit={initiateRestorePassword}/>
        );
    }
  };

  return renderStep(step);
};

export default connect(
  (state) => ({ ...state.auth.restorePassword }),
  {}
)(RestorePassword);
