import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileSaver from 'file-saver';
import { translate } from 'react-i18next';
import { Icon, Position, Tooltip } from '@blueprintjs/core';
import s from './styles.scss';
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
      <div className={s.container}>
        <div className={s.title}>{t('almostThere')}</div>
        <div className={s.warning}>{t('copySecureTip')}</div>
        <form>
          <div className={s.tip}>
            {t('walletTip')}
            <Tooltip
              content={t('walletTip')}
              position={Position.TOP}
            >
              <Icon className={s.helpIcon} icon='help' iconSize='9' />
            </Tooltip>
          </div>
          <div className={s.value}>{wallets[0].address}</div>

          <div className={s.tip}>
            {t('mnemonicPhrase')}
            <Tooltip
              content={t('mnemonicPhrase')}
              position={Position.TOP}
            >
              <Icon className={s.helpIcon} icon='help' iconSize='9' />
            </Tooltip>
          </div>
          <div className={s.value}>{wallets[0].mnemonic}</div>

          <div className={s.tip}>
            {t('privateKey')}
            <Tooltip
              content={t('privateKey')}
              position={Position.TOP}
            >
              <Icon className={s.helpIcon} icon='help' iconSize='9' />
            </Tooltip>
          </div>
          <div className={s.value}>{wallets[0].privateKey}</div>

          <div className={s.buttonSection}>
            <div className={s.copyButton}>
              <CopyToClipboard text={this._getWalletData()}
                onCopy={() => this.setState({ copied: true })}>
                <Button>
                  { copied ? t('copied') : t('copyAccountInfo') }
                </Button>
              </CopyToClipboard>
            </div>
            <div className={s.saveButton}>
              <Button
                styl="success"
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

const TranslatedComponent = translate('auth')(WalletData);

export default TranslatedComponent;
