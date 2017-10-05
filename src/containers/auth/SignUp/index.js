import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { signUp } from '../../../redux/modules/auth/signUp';

import SignUpForm from '../../../components/auth/SignUpForm';

const SignUp = (props) => {
  const { spinner } = props;

  return (
    <div className={s.form}>
      <SignUpForm spinner={spinner} onSubmit={signUp}/>
    </div>
  );
};

export default connect(
  (state) => ({
    ...state.auth.signUp
  })
)(SignUp);

