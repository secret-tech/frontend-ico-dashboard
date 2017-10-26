import React from 'react';
import s from './styles.css';

import Button from '../../common/Button';

const TwoFactorAuth = (props) => {
  const { method, enable, disable } = props;

  const renderButton = (method) => {
    switch (method) {
      case 'email':
        return (
          <Button
            size="small"
            onClick={() => enable()}>Enable</Button>
        );
      case 'google_auth':
        return (
          <Button
            size="small"
            styl="secondary"
            onClick={() => disable()}>Disable</Button>
        );
      default:
        return (
          <Button
            size="small"
            onClick={() => enable()}>Enable</Button>
        );
    }
  };

  return (
    <div className={s.tfa}>
      <div className={s.title}>
        Two-Factor Authentication
      </div>

      <div className={s.body}>
        {renderButton(method)}
      </div>
    </div>
  );
};

export default TwoFactorAuth;
