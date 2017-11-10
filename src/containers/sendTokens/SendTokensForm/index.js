import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

const BuyTokensForm = (props) => {
  console.log(props);

  return (
    <div>
      <div className={s.title}>Purchase Tokens</div>
      <form>
        <div className={s.field}>
          <Field
            component={RenderInput}
            size="large"
            name="amount"
            placeholder="0 JCR Tokens"/>
        </div>

        <div className={s.field}>
          <Field
            component={RenderInput}
            size="large"
            name="address"
            placeholder="Wallet address"/>
        </div>

        <div className={s.button}>
          <Button>Send tokens</Button>
        </div>
      </form>

      <div className={s.tip}>
        <p>
          Information about GAS
        </p>
      </div>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'sendTokensVerify',
  initialValues: {
    amount: '',
    address: ''
  }
})(BuyTokensForm);

export default connect(null)(FormComponent);
