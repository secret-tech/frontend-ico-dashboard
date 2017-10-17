import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { closeEditAccountPopup } from '../../../redux/modules/account/editAccount';

import Popup from '../../../components/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';
import RenderPassword from '../../../components/forms/RenderPassword';
import Button from '../../../components/common/Button';

const EditAccountPopup = (props) => {
  const { open, closeEditAccountPopup } = props;

  return (
    <Popup
      title="Edit account"
      open={open}
      close={() => closeEditAccountPopup()}>
      <div className={s.body}>
        <div className={s.field}>
          <Field
            component={RenderInput}
            name="name"
            type="text"
            placeholder="Full name"/>
        </div>

        <div className={s.field}>
          <Field
            component={RenderInput}
            name="email"
            type="email"
            placeholder="Email"/>
        </div>

        <div className={s.field}>
          <Field
            component={RenderPassword}
            name="password"
            placeholder="Password"/>
        </div>

        <div className={s.button}>
          <Button type="submit">Save</Button>
        </div>
      </div>
    </Popup>
  );
};

const FormComponent = reduxForm({
  form: 'editAccount',
  initialValues: {
    name: '',
    email: '',
    password: ''
  }
})(EditAccountPopup);

export default connect(
  (state) => ({
    open: state.account.editAccount.open
  }),
  {
    closeEditAccountPopup
  }
)(FormComponent);
