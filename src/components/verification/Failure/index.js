import React from 'react';
import s from './styles.css';

const Failure = () => (
  <div>
    <div className={s.title}>Verification failure!</div>
    <div className={s.text}>
      Some text.
      To protect your account and get purchased tokens you need to verify your account.
      It takes a few minutes.
    </div>
  </div>
);

export default Failure;
