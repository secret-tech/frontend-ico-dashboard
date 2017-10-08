import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { signUp } from '../../../redux/modules/auth/signUp';

import SignUpForm from '../../../components/auth/SignUpForm';

const SignUp = (props) => {
  const {
    spinner,
    params: {
      referralCode
    }
  } = props;

  console.log(props);

  return (
    <div className={s.form}>
      <SignUpForm spinner={spinner} onSubmit={signUp} referralCode={referralCode}/>
    </div>
  );
};

export default connect(
  (state) => ({
    ...state.auth.signUp
  })
)(SignUp);
