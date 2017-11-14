import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import s from './styles.css';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

class WalletData extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: true,
      counter: 5,
      copied: false
    };
  }

  componentWillMount() {
    const { wallets } = this.props;
    this.props.change('address', wallets[0].address);
    this.props.change('mnemonic', wallets[0].mnemonic);
    this.props.change('privateKey', wallets[0].privateKey);

    // enable button after 5 sec
    setTimeout(() => {
      this.setState({ btnDisabled: false });
    }, 5000);

    // countdown timer
    const counter = setInterval(() => {
      this.setState((prevState) => ({ counter: prevState.counter - 1 }));
    }, 1000);

    // kill countdown timer after 10 sec
    setTimeout(() => {
      clearInterval(counter);
    }, 10000);
  }

  _getWalletData() {
    const { wallets } = this.props;
    const result = `
    Jincor Dashboard
    Address: ${wallets[0].address}
    Mnemonic: ${wallets[0].mnemonic}
    Private Key: ${wallets[0].privateKey}
    `;

    return result;
  }

  render() {
    const { btnDisabled, counter, copied } = this.state;
    const { endSignup, accessToken } = this.props;

    return (
      <div>
        <div className={s.title}>Almost there</div>
        <form>
          <div className={s.tip}>
            Please copy and store this information. It will allow the
            secure access and use of your Jincor Contributor’s Dashboard.
          </div>

          <div className={s.tip}>This is your Jincor ETH wallet address:</div>

          <div className={s.field}>
            <Field
              disabled
              component={RenderInput}
              name="address"
              type="text"/>
          </div>

          <div className={s.tip}>
            Mnemonic phrase:
          </div>

          <div className={s.field}>
            <Field
              disabled
              component={RenderInput}
              name="mnemonic"
              type="text"/>
          </div>

          <div className={s.tip}>
            Private key:
          </div>

          <div className={s.field}>
            <Field
              disabled
              component={RenderInput}
              name="privateKey"
              type="text"/>
          </div>

          <div className={s.button}>
            <div>
              <CopyToClipboard text={this._getWalletData()}
                onCopy={() => this.setState({ copied: true })}>
                <Button
                  styl="secondary">
                  { copied ? 'Copied' : 'Copy all account information' }
                </Button>
              </CopyToClipboard>
            </div>
            <div>
              <Button
                disabled={btnDisabled}
                onClick={() => endSignup(accessToken)}>
                Continue {counter > 0 && `(${counter} sec)`}
              </Button>
            </div>
          </div>
        </form>
      </div>
    );
  }
}

const FormComponent = reduxForm({
  form: 'restorePasswordPinForm',
  initialValues: {
    address: '',
    mnemonic: '',
    privateKey: ''
  }
})(WalletData);

export default FormComponent;
