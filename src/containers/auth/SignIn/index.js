import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter, Link } from 'react-router-dom';
import queryString from 'query-string';

import { initSignIn, verifySignIn } from '../../../redux/modules/auth/signIn';

import InitSignInForm from '../../../components/auth/InitSignInForm';
import VerifySignInForm from '../../../components/auth/VerifySignInForm';

import s from './styles.scss';

const SignIn = (props) => {
  const {
    t,
    step,
    fetching,
    accessToken,
    verification: {
      verificationId,
      method
    }
  } = props;

  const qp = queryString.parse(props.location.search);

  const renderStep = (s) => {
    if (qp.verificationId && qp.code) {
      return (
        <VerifySignInForm
          onSubmit={verifySignIn}
          fetching={fetching}
          method={method}
          initialValues={{
            accessToken,
            verification: {
              id: qp.verificationId,
              code: qp.code,
              method: 'email'
            }
          }}/>
      );
    }

    if (s === 'initSignIn') {
      return (
        <InitSignInForm
          onSubmit={initSignIn}
          fetching={fetching}/>
      );
    }

    return (
      <VerifySignInForm
        onSubmit={verifySignIn}
        fetching={fetching}
        method={method}
        initialValues={{
          accessToken,
          verification: {
            id: verificationId,
            method
          }
        }}/>
    );
  };

  return (
    <div className={s.container}>
      <div className={s.form}>
        {renderStep(step)}
      </div>
      <div className={s.fp}>
        <Link to="/auth/reset-password">{t('signIn.forgotPassword')}</Link>
      </div>
      <div className={s.bottomLink}>
        {t('signIn.notHaveAccount')}{' '}
        <Link to="/auth/sign-up">{t('signIn.signUp')}</Link>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('auth')(SignIn);
const ComponentWithRouter = withRouter(TranslatedComponent);
export default connect((state) => ({
  ...state.auth.signIn
}))(ComponentWithRouter);
