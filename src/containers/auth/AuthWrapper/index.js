import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import Alert from '../../../components/app/Alert';

const AuthWrapper = (props) => {
  const { children, step } = props;

  const renderAlert = () => {
    if (step === 'wallet') {
      return (
        <Alert>
          Save this information in a secure place.
          The access to your funds will be irrecoverable in case you lose it.
        </Alert>
      );
    }

    return null;
  };

  return (
    <div className={s.wrapper}>
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

export default connect((state) => ({
  step: state.auth.signUp.step
}))(AuthWrapper);
