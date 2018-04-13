import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';

import { initSignUp, verifySignUp, closeWalletCreds } from '../../../redux/modules/auth/signUp';

import InitSignUpForm from '../../../components/auth/InitSignUpForm';
import VerifySignUpForm from '../../../components/auth/VerifySignUpForm';
import WalletCreds from '../../../components/auth/WalletCreds';

import s from './styles.scss';

const SignUp = (props) => {
  const {
    step,
    fetching,
    email,
    closeWalletCreds,
    verification: {
      verificationId,
      method
    },
    wallets
  } = props;

  const qp = queryString.parse(props.location.search);

  const renderStep = (currentStep) => {
    if (qp.verificationId && qp.code) {
      return (
        <VerifySignUpForm
          onSubmit={verifySignUp}
          fetching={fetching}
          initialValues={{
            verification: {
              verificationId: qp.verificationId,
              code: qp.code
            }
          }}/>
      );
    }

    if (currentStep === 'initSignUp') {
      return (
        <InitSignUpForm
          onSubmit={initSignUp}
          fetching={fetching}/>
      );
    }

    if (currentStep === 'walletCreds') {
      return (
        <WalletCreds
          wallet={wallets[0]}
          closeWalletCreds={closeWalletCreds}/>
      );
    }

    return (
      <VerifySignUpForm
        onSubmit={verifySignUp}
        fetching={fetching}
        method={method}
        initialValues={{
          email,
          verificationId
        }}/>
    );
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        {renderStep(step)}
      </div>
      <div className={s.bottomLink}>
        Already have account?{' '}
        <Link to='/auth/sign-in'>Sign in!</Link>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('auth')(SignUp);
const ComponentWithRouter = withRouter(TranslatedComponent);
export default connect(
  (state) => ({
    ...state.auth.signUp
  }),
  {
    closeWalletCreds
  }
)(ComponentWithRouter);
