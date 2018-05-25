import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { withRouter, Link } from 'react-router-dom';

import { initResetPassword, verifyResetPassword } from '../../../redux/modules/auth/resetPassword';

import InitResetPasswordForm from '../../../components/auth/InitResetPasswordForm';
import VerifyResetPasswordForm from '../../../components/auth/VerifyResetPasswordForm';

import s from './styles.scss';

const ResetPassword = (props) => {
  const {
    t,
    step,
    fetching,
    email,
    verification: {
      verificationId,
      method
    }
  } = props;

  const renderStep = (currentStep) => {
    if (currentStep === 'initResetPassword') {
      return (
        <InitResetPasswordForm
          onSubmit={initResetPassword}
          fetching={fetching}/>
      );
    }

    return (
      <VerifyResetPasswordForm
        onSubmit={verifyResetPassword}
        fetching={fetching}
        method={method}
        initialValues={{
          email,
          verification: {
            verificationId,
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
        <Link to="/auth/sign-in">{t('resetPassword.signIn')}</Link>
      </div>
      <div className={s.bottomLink}>
        {t('resetPassword.notHaveAccount')}{' '}
        <Link to="/auth/sign-up">{t('resetPassword.signUp')}</Link>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('auth')(ResetPassword);
const ComponentWithRouter = withRouter(TranslatedComponent);
export default connect((state) => ({
  ...state.auth.resetPassword
}))(ComponentWithRouter);
