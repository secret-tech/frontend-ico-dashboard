import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';

import { closeInitChangePasswordPopup, initChangePassword } from '../../../redux/modules/settings/changePassword';

import Popup from '../../../containers/common/Popup';
import InitChangePasswordForm from '../../../components/settings/InitChangePasswordForm';

const ChangePasswordPopup = (props) => {
  const {
    t,
    open,
    closeInitChangePasswordPopup,
    fetching
  } = props;

  return (
    <Popup
      title={t('changePasswordPopup.title')}
      isOpen={open}
      onClose={closeInitChangePasswordPopup}
      style={{ width: '400px' }}>
      <InitChangePasswordForm
        onSubmit={initChangePassword}
        fetching={fetching}/>
    </Popup>
  );
};

const TranslatedComponent = translate('settings')(ChangePasswordPopup);

export default connect(
  (state) => ({
    open: state.account.changePassword.initChangePasswordPopupIsOpen,
    fetching: state.account.changePassword.fetching
  }),
  {
    closeInitChangePasswordPopup
  }
)(TranslatedComponent);
