import React from 'react';
import s from './styles.css';

import SignInForm from '../../../components/auth/SignInForm';

const SignIn = (props) => {
  console.log(props);

  return (
    <div className={s.form}>
      <SignInForm/>
    </div>
  );
};

export default SignIn;
