import React from 'react';
import s from './styles.scss';

const AuthWrapper = (props) => {
  const { children } = props;

  return (
    <div className={s.auth}>
      <div className={s.topbar}>
        <div>
          <a
            href="https://moonwallet.tech"
            className="pt-button pt-minimal pt-icon-chevron-left"
            tabindex="0">Back to landing page</a>
        </div>
      </div>

      <div className={s.logo}>
        <img src={require('../../../assets/images/logo.svg')}/>
      </div>

      <div>{children}</div>
    </div>
  );
};

export default AuthWrapper;
