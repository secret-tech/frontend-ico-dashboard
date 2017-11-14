import React from 'react';
import s from './styles.css';

const Success = () => (
  <div>
    <div className={s.title}>Your account is verified!</div>
    <div className={s.text}>
      Your personal data has been verified successfully and now you
      have full access to Jincor crowdsale
    </div>
  </div>
);

export default Success;
