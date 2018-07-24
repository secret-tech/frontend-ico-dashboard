import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import cx from 'classnames';

import {
  closeDisableTwoFactorAuthPopup,
  verifyDisableTwoFactorAuth
} from '../../../redux/modules/settings/disableTwoFactorAuth';

import Popup from '../../../containers/common/Popup';
import DisableTwoFactorAuthForm from '../../../components/settings/DisableTwoFactorAuthForm';

import s from './styles.scss';


const DisableTwoFactorAuthPopup = (props) => {
  const {
    t,
    open,
    closeDisableTwoFactorAuthPopup,
    fetching,
    verification
  } = props;

  const {
    verificationId,
    method
  } = verification;

  return (
    <Popup
      title={t('disable2faPopup.title')}
      isOpen={open}
      onClose={closeDisableTwoFactorAuthPopup}
      style={{ width: '300px' }}>

      <div className={cx(s.description, 'pt-text-muted')}>
        {t('disable2faPopup.description')}
      </div>

      <DisableTwoFactorAuthForm
        onSubmit={verifyDisableTwoFactorAuth}
        fetching={fetching}
        initialValues={{
          verificationId,
          method
        }}/>
    </Popup>
  );
};


const TranslatedComponent = translate('settings')(DisableTwoFactorAuthPopup);
export default connect(
  (state) => ({
    open: state.account.disableTwoFactorAuth.disableTwoFactorAuthPopupOpen,
    fetching: state.account.disableTwoFactorAuth.fetching,
    verification: state.account.disableTwoFactorAuth.verification
  }),
  {
    closeDisableTwoFactorAuthPopup
  }
)(TranslatedComponent);
