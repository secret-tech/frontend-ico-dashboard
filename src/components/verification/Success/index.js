import React from 'react';
import s from './styles.scss';

const Success = () => (
  <div className={s.body}>
    <div className={s.title}>Your account is being verified…</div>
    <div className={s.text}>
      Your documents are successfully uploaded and being processed now.
      This may take up to 15 minutes, please be patient and don’t try to
      relaunch the verification process.
    </div>
  </div>
);

export default Success;
