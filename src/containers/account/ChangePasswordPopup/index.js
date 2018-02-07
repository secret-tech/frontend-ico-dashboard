import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import { passwordValidate } from '../../../utils/validators';

import { closeChangePasswordPopup, changePassword } from '../../../redux/modules/account/changePassword';

import Popup from '../../../components/common/Popup';
import RenderPassword from '../../../components/forms/RenderPassword';
import Button from '../../../components/common/Button';

const ChangePasswordPopup = (props) => {
  const {
    t,
    open,
    handleSubmit,
    closeChangePasswordPopup,
    spinner,
    invalid,
    error
  } = props;

  return (
    <Popup
      title={t('changePassword')}
      open={open}
      close={() => closeChangePasswordPopup()}>

      <div className={s.body}>
        {error && <div className={s.error}>{error}</div>}

        <form onSubmit={handleSubmit(changePassword)}>
          <div className={s.field}>
            <Field
              component={RenderPassword}
              name="oldPassword"
              placeholder={t('oldPassword')}
              validate={passwordValidate}/>
          </div>

          <div className={s.field}>
            <Field
              component={RenderPassword}
              name="newPassword"
              placeholder={t('newPassword')}
              validate={passwordValidate}/>
          </div>

          <div className={s.description}>
            {t('minPasswordLengthWarning')}
          </div>

          <div className={s.button}>
            <Button type="submit" spinner={spinner} disabled={invalid}>{t('change')}</Button>
          </div>
        </form>
      </div>

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

const TranslatedComponent = translate('account')(FormComponent);

export default connect(
  (state) => ({
    open: state.account.changePassword.changePasswordPopupOpen,
    spinner: state.account.changePassword.spinner
  }),
  {
    closeChangePasswordPopup
  }
)(TranslatedComponent);
