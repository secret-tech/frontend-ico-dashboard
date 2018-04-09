import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import { openChangePasswordPopup } from '../../../redux/modules/account/changePassword';
import { logout } from '../../../redux/modules/app/app';

import Button from '../../../components/common/Button';

const Info = (props) => {
  const {
    t,
    openChangePasswordPopup,
    name,
    email,
    logout,
    kycStatus
  } = props;

  return (
    <div className={s.info}>
      <div className={s.name}>
        {t('hello')},<br/>
        {name}!{kycStatus === 'verified' ? <img src={require('./svg/kyc.svg')} title={t('accountVerified')}/> : ''}
      </div>

      <div className={s.email}>{email}</div>

      <div className={s.edit}>
        <Button
          type="button"
          size="small"
          onClick={() => openChangePasswordPopup()}>
          {t('changePassword')}
        </Button>
      </div>

      <div className={s.logout}>
        <Button
          type="button"
          size="small"
          styl="secondary"
          onClick={() => logout()}>
          {t('signOut')}
        </Button>
      </div>
    </div>
  );
};

const TranslatedComponent = translate('account')(Info);

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
)(TranslatedComponent);
