import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Button, Intent } from '@blueprintjs/core';
import cx from 'classnames';
import s from './styles.css';

import { passwordValidate } from '../../../utils/validators';

import { closeChangePasswordPopup, changePassword } from '../../../redux/modules/settings/changePassword';

import Popup from '../../../components/common/Popup';
import RenderPassword from '../../../components/forms/RenderPassword';

const ChangePasswordPopup = (props) => {
  const {
    t,
    open,
    handleSubmit,
    closeChangePasswordPopup,
    spinner,
    invalid
  } = props;

  return (
    <Popup
      title={t('changePassword')}
      open={open}
      close={() => closeChangePasswordPopup()}
      style={{ width: '300px' }}>
      <form onSubmit={handleSubmit(changePassword)}>
        <Field
          component={RenderPassword}
          name="oldPassword"
          placeholder={t('oldPassword')}
          validate={passwordValidate} />

        <Field
          component={RenderPassword}
          name="newPassword"
          placeholder={t('newPassword')}
          validate={passwordValidate} />

        <div className={cx(s.description, 'pt-text-muted')}>
          {t('minPasswordLengthWarning')}
        </div>

        <Button className="pt-fill" type="submit" intent={Intent.PRIMARY} loading={spinner} disabled={invalid}>
          {t('change')}
        </Button>
      </form>
    </Popup>
  );
};

const FormComponent = reduxForm({
  form: 'changePassword',
  initialValues: {
    oldPassword: '',
    newPassword: ''
  }
})(ChangePasswordPopup);

const TranslatedComponent = translate('settings')(FormComponent);

export default connect(
  (state) => ({
    open: state.account.changePassword.changePasswordPopupOpen,
    spinner: state.account.changePassword.spinner
  }),
  {
    closeChangePasswordPopup
  }
)(TranslatedComponent);
