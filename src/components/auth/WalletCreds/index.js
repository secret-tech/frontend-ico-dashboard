import React, { Component } from 'react';
import { Callout, Intent, Button } from '@blueprintjs/core';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import FileSaver from 'file-saver';

import Globals from '../../../locales/globals';

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
      `${Globals.companyName} Dashboard\nAddress: ${address}\nMnemonic: ${mnemonic}\nPrivate Key: ${privateKey}`
    ], { type: 'text/plain;charset=utf-8' });

    const continueAction = () => {
      closeWalletCreds();
      FileSaver.saveAs(file, `${Globals.companyName.toLowerCase()}_wallet.txt`);
    };

    const walletData = `
    ${Globals.companyName} Dashboard
    Address: ${address}
    Mnemonic: ${mnemonic}
    Private Key: ${privateKey}
    `;

    return (
      <div className={s.creds}>
        <h3>Almost there</h3>

        <div className={s.alert}>
          <Callout intent={Intent.DANGER} icon={null}>
            Please copy and store this information.
            It will allow the secure access and use of your ICO Contributor’s Dashboard
          </Callout>
        </div>

        <div className={s.rows}>
          <div className={s.row}>
            <div>Your ETH wallet address</div>
            <h3>{address}</h3>
          </div>
          <div className={s.row}>
            <div>Your private key</div>
            <h3>{privateKey}</h3>
          </div>
          <div className={s.row}>
            <div>Your mnemonic phrase</div>
            <h3>{mnemonic}</h3>
          </div>
        </div>

        <div className={s.buttons}>
          <div className={s.button}>
            <CopyToClipboard text={walletData}
              onCopy={() => this.setState({ copied: true })}>
              <Button
                className="pt-large"
                text={copied ? 'Copied' : 'Copy account info' }
                intent={Intent.SUCCESS}/>
            </CopyToClipboard>
          </div>
          <div className={s.button}>
            <Button
              className="pt-large"
              text={counter > 0 ? `Download and continue (${counter} sec)` : 'Download and continue'}
              intent={Intent.PRIMARY}
              disabled={btnDisabled}
              onClick={() => continueAction()}/>
          </div>
        </div>
      </div>
    );
  }
}

export default WalletCreds;
