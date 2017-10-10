import React from 'react';
import s from './styles.css';

const AuthWrapper = (props) => {
  const { children } = props;

  return (
    <div className={s.wrapper}>
      <div className={s.form}>
        <div className={s.logo}>
          <img src={require('../../../assets/images/logo.svg')}/>
        </div>

        <div className={s.body}>
          {children}
        </div>
      </div>
    </div>
  );
};

export default AuthWrapper;
