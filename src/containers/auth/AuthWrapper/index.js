import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import cx from 'classnames';
import s from './styles.scss';

import Alert from '../../../components/app/Alert';

const AuthWrapper = (props) => {
  const { t, children, step } = props;

  const renderAlert = () => {
    if (step === 'wallet') {
      return (
        <Alert>
          {t('saveSecureInfoAlert')}
        </Alert>
      );
    }

    return null;
  };

  return (
    <div className={cx(s.wrapper, 'pt-dark')}>
      {renderAlert()}
      <div className={s.form}>
        <div className={s.logo}>
          <img src={require('../../../assets/images/logo.svg')}/>
        </div>

        <div className={s.body}>
          {children}
        </div>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('auth')(AuthWrapper);

export default connect((state) => ({
  step: state.auth.signUp.step
}))(TranslatedComponent);
