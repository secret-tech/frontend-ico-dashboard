import React from 'react';
import s from './styles.css';

const Failure = () => (
  <div>
    <div className={s.title}>Verification failure.</div>
    <div className={s.text}>
      We were unable to match your account information automatically and uploaded documents.
      Please reload the page and try again or contact Jincor support.<br/><br/>
      <a href="mailto:support@jincor.com">support@jincor.com</a>
    </div>
  </div>
);

export default Failure;
