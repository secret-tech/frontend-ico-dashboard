import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileSaver from 'file-saver';
import { translate } from 'react-i18next';
import s from './styles.css';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';
import Globals from '../../../locales/globals';

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
    ${Globals.companyName} Dashboard
    Address: ${wallets[0].address}
    Mnemonic: ${wallets[0].mnemonic}
    Private Key: ${wallets[0].privateKey}
    `;

    return result;
  }

  render() {
    const { btnDisabled, counter, copied } = this.state;
    const {
      t,
      endSignup,
      accessToken,
      wallets
    } = this.props;

    const file = new Blob([
      `${Globals.companyName} Dashboard\nAddress: ${wallets[0].address}\nMnemonic: ${wallets[0].mnemonic}\nPrivate Key: ${wallets[0].privateKey}`
    ], { type: 'text/plain;charset=utf-8' });

    const continueAction = () => {
      endSignup(accessToken);
      FileSaver.saveAs(file, `${Globals.companyName.toLowerCase()}_wallet.txt`);
    };

    return (
      <div>
        <div className={s.title}>{t('almostThere')}</div>
        <form>
          <div className={s.tip}>
            {t('copySecureTip')}
          </div>

          <div className={s.tip}>{t('walletTip')}</div>

          <div className={s.field}>
            <Field
              disabled
              component={RenderInput}
              name="address"
              type="text"/>
          </div>

          <div className={s.tip}>
            {t('mnemonicPhrase')}
          </div>

          <div className={s.field}>
            <Field
              disabled
              component={RenderInput}
              name="mnemonic"
              type="text"/>
          </div>

          <div className={s.tip}>
            {t('privateKey')}
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
                  { copied ? t('copied') : t('copyAccountInfo') }
                </Button>
              </CopyToClipboard>
            </div>
            <div>
              <Button
                disabled={btnDisabled}
                onClick={() => continueAction()}>
                {t('continueAndDownload')} {counter > 0 && `(${counter} ${t('sec')})`}
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

const TranslatedComponent = translate('auth')(FormComponent);

export default TranslatedComponent;
