import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import s from './styles.css';

import { required } from '../../../utils/validators';

import { changeEth, changeJcr, initiateBuyTokens } from '../../../redux/modules/dashboard/buyTokens';

import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class BuyTokensForm extends Component {
  componentWillReceiveProps(nextProps) {
    const { change, eth, jcr } = nextProps;

    if (jcr && eth) {
      change('eth', eth);
      change('jcr', jcr);
    }
  }

  render() {
    const {
      spinner,
      invalid,
      changeEth,
      changeJcr,
      handleSubmit
    } = this.props;

    return (
      <div>
        <div className={s.title}>Buy Tokens</div>
        <form onSubmit={handleSubmit(initiateBuyTokens)}>
          <div className={s.field}>
            <Field
              component={RenderInput}
              onChange={(e) => changeEth(e.target.value)}
              size="large"
              name="eth"
              placeholder="0 ETH Tokens"
              validate={required}/>
          </div>

          <div className={s.field}>
            <Field
              component={RenderInput}
              onChange={(e) => changeJcr(e.target.value)}
              size="large"
              name="jcr"
              placeholder="0 JCR Tokens"
              validate={required}/>
          </div>

          <div className={s.button}>
            <Button
              type="submit"
              disabled={invalid}
              spinner={spinner}>Buy tokens</Button>
          </div>
        </form>

        <div className={s.tip}>
          <p>
            You are able to buy JCR tokens using ETH.<br/>
            The calculator is provided for your convenience.
          </p>
          <p>
            You can enter a number of JCR tokens you wish to buy and calculate
            the amount you would need to have in your account wallet.
          </p>
        </div>
      </div>
    );
  }
}

const FormComponent = reduxForm({
  form: 'sendTokensVerify',
  initialValues: {
    eth: '',
    jcr: ''
  }
})(BuyTokensForm);

export default connect(
  (state) => ({
    spinner: state.dashboard.buyTokens.spinner,
    eth: state.dashboard.buyTokens.eth,
    jcr: state.dashboard.buyTokens.jcr
  }),
  {
    changeJcr,
    changeEth
  }
)(FormComponent);
