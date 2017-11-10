import React, { Component } from 'react';
import { connect } from 'react-redux';

import {
  initiateRestorePassword,
  setPin,
  verifyRestorePassword,
  resetStore
} from '../../../redux/modules/auth/restorePassword';

import RestorePasswordEmailForm from '../../../components/auth/RestorePasswordEmailForm';
import RestorePasswordPinForm from '../../../components/auth/RestorePasswordPinForm';
import RestorePasswordNewPasswordForm from '../../../components/auth/RestorePasswordNewPasswordForm';

class RestorePassword extends Component {
  componentWillUnmount() {
    this.props.resetStore();
  }

  render() {
    const {
      step,
      spinner,
      code,
      email,
      verification
    } = this.props;

    const {
      method
    } = verification;

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
              method={method}
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
  }
}

export default connect(
  (state) => ({ ...state.auth.restorePassword }),
  {
    resetStore
  }
)(RestorePassword);
