import React from 'react';
import s from './styles.css';

const Success = () => (
  <div>
    <div className={s.title}>Your account is verified!</div>
    <div className={s.text}>
      Some text.
      To protect your account and get purchased tokens you need to verify your account.
      It takes a few minutes.
    </div>
  </div>
);

export default Success;
