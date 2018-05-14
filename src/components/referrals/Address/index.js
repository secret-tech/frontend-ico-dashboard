import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { translate } from 'react-i18next';
import { Button, Intent } from '@blueprintjs/core';
import s from './styles.css';

import Input from '../../common/Input';

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  render() {
    const {
      address,
      // openInvitePopup
    } = this.props;

    const { copied } = this.state;

    return (
      <div className={s.address}>
        <div className={s.buttons}>
          <Input
            disabled
            value={address}/>

          <div className={s.copy}>
            <CopyToClipboard
              text={address}
              onCopy={() => this.setState({ copied: true })}>
              <Button size="small" intent={Intent.PRIMARY}>
                {copied ? 'Copied' : 'Copy address'}
              </Button>
            </CopyToClipboard>
          </div>

          {/* <div className={s.copy}>
            <Button
              size="small"
              styl="secondary"
              onClick={() => openInvitePopup()}>{t('inviteReferralsByEmail')}</Button>
          </div> */}
        </div>
      </div>
    );
  }
}

const TranslatedComponent = translate('referrals')(Address);

export default TranslatedComponent;
