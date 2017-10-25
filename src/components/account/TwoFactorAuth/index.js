import React from 'react';
import s from './styles.css';

import Button from '../../common/Button';

const TwoFactorAuth = (props) => {
  const { enabled, enable, disable } = props;
  console.log(enabled);

  return (
    <div className={s.tfa}>
      <div className={s.title}>
        Two-Factor Authentication
      </div>

      <div className={s.body}>
        <Button size="small" onClick={() => enable()}>Enable</Button>
        <Button size="small" styl="secondary" onClick={() => disable()}>Disable</Button>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
