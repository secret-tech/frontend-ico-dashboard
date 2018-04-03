import React from 'react';
import cx from 'classnames';
import s from './styles.scss';

const AuthWrapper = (props) => {
  const { children } = props;

  return (
    <div className={cx(s.wrapper, 'pt-dark')}>
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
