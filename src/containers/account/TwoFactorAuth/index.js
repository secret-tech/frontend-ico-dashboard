import React from 'react';
import s from './styles.css';

import Button from '../../../components/common/Button';

const TwoFactorAuth = (props) => {
  console.log(props);

  return (
    <div className={s.tfa}>
      <div className={s.title}>
        Two-Factor Authentication
      </div>

      <div className={s.body}>
        <Button size="small">Enable</Button>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
