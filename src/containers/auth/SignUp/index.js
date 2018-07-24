import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';

import { initSignUp, infoSignUp, verifySignUp, closeWalletCreds } from '../../../redux/modules/auth/signUp';

import InitSignUpForm from '../../../components/auth/InitSignUpForm';
import InfoSignUpForm from '../../../components/auth/InfoSignUpForm';
import VerifySignUpForm from '../../../components/auth/VerifySignUpForm';
import WalletCreds from '../../../components/auth/WalletCreds';

import s from './styles.scss';

const SignUp = (props) => {
  const {
    t,
    step,
    fetching,
    email,
    password,
    referral,
    agreeTos,
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

    if (currentStep === 'initSignUp' && qp.referral) {
      return (
        <InitSignUpForm
          onSubmit={initSignUp}
          fetching={fetching}
          referral={qp.referral}
          initialValues={{ referral: qp.referral }}/>
      );
    }

    if (currentStep === 'initSignUp') {
      return (
        <InitSignUpForm
          onSubmit={initSignUp}
          fetching={fetching}/>
      );
    }

    if (currentStep === 'infoSignUp') {
      return (
        <InfoSignUpForm
          onSubmit={infoSignUp}
          fetching={fetching}
          initialValues={{
            email,
            password,
            referral,
            agreeTos,
            dob: null
          }}/>
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
        {t('signUp.alreadyHaveAccount')}{' '}
        <Link to='/auth/sign-in'>{t('signUp.signIn')}</Link>
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
