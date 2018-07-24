import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { closeVerifyChangePasswordPopup, verifyChangePassword } from '../../../redux/modules/settings/changePassword';

import Popup from '../../../containers/common/Popup';
import VerifyChangePasswordForm from '../../../components/settings/VerifyChangePasswordForm';

const VerifyChangePasswordPopup = (props) => {
  const {
    t,
    open,
    closeVerifyChangePasswordPopup,
    fetching,
    oldPassword,
    newPassword,
    verification
  } = props;

  const {
    method,
    verificationId
  } = verification;

  return (
    <Popup
      title={t('verifyChangePasswordPopup.title')}
      isOpen={open}
      onClose={closeVerifyChangePasswordPopup}
      style={{ width: '400px' }}>
      <VerifyChangePasswordForm
        onSubmit={verifyChangePassword}
        fetching={fetching}
        method={method}
        initialValues={{
          oldPassword,
          newPassword,
          verification: {
            method,
            verificationId
          }
        }}/>
    </Popup>
  );
};


const TranslatedComponent = translate('settings')(VerifyChangePasswordPopup);

export default connect(
  (state) => ({
    ...state.account.changePassword,
    open: state.account.changePassword.verifyChangePasswordPopupIsOpen
  }),
  {
    closeVerifyChangePasswordPopup
  }
)(TranslatedComponent);
