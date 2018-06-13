import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { Button, Intent } from '@blueprintjs/core';

import RenderNumericInput from '../../../components/_forms/RenderNumericInput';

import s from './styles.scss';

class ContributeForm extends Component {
  render() {
    return (
      <div>
        <h2>Contribution</h2>

        <div>
          <p>
            On this screen, you can purchase SPACE tokens with ETH in Ropsten testnet.
            Use the calculator below to evaluate sum for the desired amount of tokens.
          </p>
          <p>
            Just input the amount of ETH you want to contribute and find out the number of SPACE tokens you will get. Please note that a little ETH adding on top to cover the gas fee. <a href="https://myetherwallet.github.io/knowledge-base/gas/what-is-gas-ethereum.html" target="_blank">What is gas fee?</a>
          </p>
        </div>

        <form className={s.form}>
          <div className={s.field}>
            <Field
              name="CHANGE_ME_LATER"
              large
              fill
              component={RenderNumericInput}
              placeholder="ex: 10.014584"
              stepSize={0.1}
              min={1}
              max={50}
              tip="Enter the value in ethers (ETH)"/>
          </div>

          <div className={s.tips}>
            <div className="pt-text-muted">Expected transaction fee: <b>0.0013</b> ETH</div>
            <div className="pt-text-muted">Minimum available contribution: <b>1.0013</b> ETH</div>
          </div>

          <div className={s.calc}>
            <div>You are buying <b>1329</b> SPACE tokens for <b>1.3</b> ETH</div>
          </div>

          <div className={s.button}>
            <Button
              large
              rightIcon="arrow-right"
              intent={Intent.PRIMARY}>
              Confirm contribution
            </Button>
          </div>
        </form>
      </div>
    );
  }
}

const FormComponent = reduxForm({
  form: 'contribute',
  initialValues: {
    eth: ''
  }
})(ContributeForm);

export default FormComponent;
