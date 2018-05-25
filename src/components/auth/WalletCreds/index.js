import React, { Component } from 'react';
import { translate } from 'react-i18next';
import { Callout, Intent, Button } from '@blueprintjs/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileSaver from 'file-saver';

import config from '../../../utils/config';
import s from './styles.scss';

class WalletCreds extends Component {
  constructor(props) {
    super(props);

    this.state = {
      btnDisabled: true,
      counter: 5,
      copied: false
    };
  }

  componentDidMount() {
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

  render() {
    const {
      t,
      closeWalletCreds,
      wallet: {
        address,
        mnemonic,
        privateKey
      }
    } = this.props;

    const {
      counter,
      btnDisabled,
      copied
    } = this.state;

    const file = new Blob([
      `${config.companyName} Dashboard\nSign in URL: ${config.domain}/auth/sign-in\nAddress: ${address}\nMnemonic: ${mnemonic}\nPrivate Key: ${privateKey}`
    ], { type: 'text/plain;charset=utf-8' });

    const continueAction = () => {
      closeWalletCreds();
      FileSaver.saveAs(file, `${config.companyName.toLowerCase()}_wallet.txt`);
    };

    const walletData = `
    ${config.companyName} Dashboard
    Sign in URL: ${config.domain}/auth/sign-in
    Address: ${address}
    Mnemonic: ${mnemonic}
    Private Key: ${privateKey}
    `;

    return (
      <div className={s.creds}>
        <h3>{t('walletCreds.almostThere')}</h3>

        <div className={s.alert}>
          <Callout intent={Intent.DANGER} icon={null}>
            {t('walletCreds.callout')}
          </Callout>
        </div>

        <div className={s.rows}>
          <div className={s.row}>
            <div>{t('walletCreds.address')}</div>
            <h3>{address}</h3>
          </div>
          <div className={s.row}>
            <div>{t('walletCreds.pk')}</div>
            <h3>{privateKey}</h3>
          </div>
          <div className={s.row}>
            <div>{t('walletCreds.mnemonic')}</div>
            <h3>{mnemonic}</h3>
          </div>
        </div>

        <div className={s.buttons}>
          <div className={s.button}>
            <CopyToClipboard text={walletData}
              onCopy={() => this.setState({ copied: true })}>
              <Button
                className="pt-large"
                text={copied ? t('walletCreds.copied') : t('walletCreds.copy') }
                intent={Intent.SUCCESS}/>
            </CopyToClipboard>
          </div>
          <div className={s.button}>
            <Button
              className="pt-large"
              text={counter > 0 ? `${t('walletCreds.continue')} (${counter} ${t('walletCreds.sec')})` : t('walletCreds.continue')}
              intent={Intent.PRIMARY}
              disabled={btnDisabled}
              onClick={() => continueAction()}/>
          </div>
        </div>
      </div>
    );
  }
}

const TranslatedComponent = translate('auth')(WalletCreds);
export default TranslatedComponent;
