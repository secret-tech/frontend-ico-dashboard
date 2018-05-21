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
    method
  } = verification;

  return (
    <Popup
      title={t('changePassword')}
      open={open}
      close={() => closeVerifyChangePasswordPopup()}
      style={{ width: '400px' }}>
      <VerifyChangePasswordForm
        onSubmit={verifyChangePassword}
        fetching={fetching}
        method={method}
        initialValues={{
          oldPassword,
          newPassword,
          verification
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
