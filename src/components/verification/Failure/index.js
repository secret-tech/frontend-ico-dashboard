import React from 'react';
import s from './styles.scss';
import config from '../../../utils/config';

const Failure = () => (
  <div className={s.body}>
    <div className={s.title}>Verification failure.</div>
    <div className={s.text}>
      We were unable to match your account information automatically and uploaded documents.
      Please reload the page and try again or contact Jincor support.<br/><br/>
      <a href={`mailto:${config.supportEmail}`}>{config.supportEmail}</a>
    </div>
  </div>
);

export default Failure;
