import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { translate } from 'react-i18next';
import s from './styles.css';

import Input from '../../common/Input';
import Button from '../../common/Button';

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  render() {
    const { t, address } = this.props;
    const { copied } = this.state;

    return (
      <div className={s.address}>
        <div className={s.title}>{t('walletAddressTitle')}</div>

        <div className={s.body}>
          <Input
            disabled
            value={address}/>
          <div className={s.copy}>
            <CopyToClipboard
              text={address}
              onCopy={() => this.setState({ copied: true })}>
              <Button size="small">
                { copied ? t('copied') : t('copyToClipboard') }
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}

export default translate('account')(Address);
