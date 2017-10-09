import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { signIn } from '../../../redux/modules/auth/signIn';

import SignInForm from '../../../components/auth/SignInForm';

const SignIn = (props) => {
  const { spinner } = props;

  return (
    <div className={s.form}>
      <SignInForm spinner={spinner} onSubmit={signIn}/>
    </div>
  );
};

export default connect(
  (state) => ({
    ...state.auth.signIn
  })
)(SignIn);
