import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { translate } from 'react-i18next';
import s from './styles.css';

import Input from '../../common/Input';
import Button from '../../common/Button';
import Globals from '../../../locales/globals';

class Address extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  render() {
    const { t, address, openInvitePopup } = this.props;
    const { copied } = this.state;

    return (
      <div className={s.address}>
        <div className={s.title}>{t('addressTitle')}</div>
        <div className={s.text}>
        {t('addressText_1')}
        <br/><br/>
        {t('addressText_2')}
        <br/><br/>
        {t('addressDetails_1')} <a href={`mailto:${Globals.partnersMail}`}>{Globals.partnersMail}</a> {t('addressDetails_2')}
        </div>

        <div className={s.buttons}>
          <Input
            disabled
            value={address}/>
          <div className={s.copy}>
            <CopyToClipboard
              text={address}
              onCopy={() => this.setState({ copied: true })}>
              <Button size="small">
                {copied ? t('copied') : t('copyReferralAddress')}
              </Button>
            </CopyToClipboard>
          </div>
          <div className={s.copy}>
            <Button
              size="small"
              styl="secondary"
              onClick={() => openInvitePopup()}>{t('inviteReferralsByEmail')}</Button>
          </div>
        </div>
      </div>
    );
  }
}

const TranslatedComponent = translate('referrals')(Address);

export default TranslatedComponent;
