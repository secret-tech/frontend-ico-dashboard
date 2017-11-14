import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { openChangePasswordPopup } from '../../../redux/modules/account/changePassword';
import { logout } from '../../../redux/modules/app/app';

import Button from '../../../components/common/Button';

const Info = (props) => {
  const {
    openChangePasswordPopup,
    name,
    email,
    logout,
    kycStatus
  } = props;

  return (
    <div className={s.info}>
      <div className={s.name}>
        Hello,<br/>
        {name}!{kycStatus === 'verified' ? <img src={require('./svg/kyc.svg')} title="Account verified"/> : ''}
      </div>

      <div className={s.email}>{email}</div>

      <div className={s.edit}>
        <Button
          type="button"
          size="small"
          onClick={() => openChangePasswordPopup()}>
          Change password
        </Button>
      </div>

      <div className={s.logout}>
        <Button
          type="button"
          size="small"
          styl="secondary"
          onClick={() => logout()}>
          Sign Out
        </Button>
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    name: state.app.app.user.name,
    email: state.app.app.user.email,
    kycStatus: state.app.app.user.kycStatus
  }),
  {
    openChangePasswordPopup,
    logout
  }
)(Info);
