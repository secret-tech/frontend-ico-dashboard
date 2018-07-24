import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import cx from 'classnames';

import {
  closeEnableTwoFactorAuthPopup,
  verifyEnableTwoFactorAuth
} from '../../../redux/modules/settings/enableTwoFactorAuth';

import Popup from '../../../containers/common/Popup';
import EnableTwoFactorAuthForm from '../../../components/settings/EnableTwoFactorAuthForm';

import s from './styles.scss';


const EnableTwoFactorAuthPopup = (props) => {
  const {
    t,
    open,
    closeEnableTwoFactorAuthPopup,
    fetching,
    verification
  } = props;

  const {
    qrPngDataUri,
    verificationId,
    method
  } = verification;

  return (
    <Popup
      title={t('enable2faPopup.title')}
      isOpen={open}
      onClose={closeEnableTwoFactorAuthPopup}
      style={{ width: '300px' }}>

      <div className={cx(s.description, 'pt-text-muted')}>
        {t('enable2faPopup.description')}
      </div>

      <div className={s.qr}>
        <img src={qrPngDataUri} />
      </div>

      <EnableTwoFactorAuthForm
        onSubmit={verifyEnableTwoFactorAuth}
        fetching={fetching}
        initialValues={{
          verificationId,
          method
        }}/>
    </Popup>
  );
};


const TranslatedComponent = translate('settings')(EnableTwoFactorAuthPopup);
export default connect(
  (state) => ({
    open: state.account.enableTwoFactorAuth.enableTwoFactorAuthPopupOpen,
    fetching: state.account.enableTwoFactorAuth.fetching,
    verification: state.account.enableTwoFactorAuth.verification
  }),
  {
    closeEnableTwoFactorAuthPopup
  }
)(TranslatedComponent);
