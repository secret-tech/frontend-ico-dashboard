import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { passwordValidate } from '../../../utils/validators';

import { closeChangePasswordPopup, changePassword } from '../../../redux/modules/account/changePassword';

import Popup from '../../../components/common/Popup';
import RenderPassword from '../../../components/forms/RenderPassword';
import Button from '../../../components/common/Button';

const ChangePasswordPopup = (props) => {
  const {
    open,
    handleSubmit,
    closeChangePasswordPopup,
    spinner,
    invalid,
    error
  } = props;

  return (
    <Popup
      title="Change password"
      open={open}
      close={() => closeChangePasswordPopup()}>

      <div className={s.body}>
        {error && <div className={s.error}>{error}</div>}

        <form onSubmit={handleSubmit(changePassword)}>
          <div className={s.field}>
            <Field
              component={RenderPassword}
              name="oldPassword"
              placeholder="Old password"
              validate={passwordValidate}/>
          </div>

          <div className={s.field}>
            <Field
              component={RenderPassword}
              name="newPassword"
              placeholder="New password"
              validate={passwordValidate}/>
          </div>

          <div className={s.description}>
            Password must contain minimum 8 characters.
          </div>

          <div className={s.button}>
            <Button type="submit" spinner={spinner} disabled={invalid}>Change</Button>
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

export default connect(
  (state) => ({
    open: state.account.changePassword.changePasswordPopupOpen,
    spinner: state.account.changePassword.spinner
  }),
  {
    closeChangePasswordPopup
  }
)(FormComponent);
