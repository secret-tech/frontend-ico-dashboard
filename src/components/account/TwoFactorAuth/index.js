import React from 'react';
import s from './styles.css';

import Button from '../../common/Button';

const TwoFactorAuth = (props) => {
  const { enabled, ...restProps } = props;
  console.log(enabled);

  return (
    <div className={s.tfa}>
      <div className={s.title}>
        Two-Factor Authentication
      </div>

      <div className={s.body}>
        <Button size="small" {...restProps}>Enable</Button>
      </div>
    </div>
  );
};

export default TwoFactorAuth;
