import React from 'react';
import { reduxForm, Field } from 'redux-form';
import s from './styles.css';

import { required } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

const BuyTokensForm = (props) => {
  console.log(props);

  return (
    <div>
      <div className={s.title}>Buy Tokens</div>
      <form>
        <div className={s.field}>
          <Field
            component={RenderInput}
            size="large"
            name="jcr"
            type="number"
            placeholder="0 JCR Tokens"
            min="0"
            validate={required}/>
        </div>

        <div className={s.field}>
          <Field
            component={RenderInput}
            size="large"
            name="eth"
            type="number"
            placeholder="0 ETH Tokens"
            min="0"
            validate={required}/>
        </div>

        <div className={s.button}>
          <Button>Buy tokens</Button>
        </div>
      </form>

      <div className={s.tip}>
        <p>
          You are able to buy JCR tokens using ETH or BTC.<br/>
          The calculator is provided for your convenience.
        </p>
        <p>
          You can enter a number of JCR tokens you wish to buy and calculate
          the amount you would need to have in your account wallet.
        </p>
      </div>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'buyTokens',
  initialValues: {
    jcr: 0,
    eth: 0
  }
})(BuyTokensForm);

export default FormComponent;
