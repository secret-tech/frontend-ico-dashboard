import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
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
    const { address, openInvitePopup } = this.props;
    const { copied } = this.state;

    return (
      <div className={s.address}>
        <div className={s.title}>Earn tokens for free</div>
        <div className={s.text}>
          Text about referral program. To buy tokenst you need to
          deposit your account wallet. To buy token you need to
          deposit your account wallet. To buy token you need to
          deposit your account wallet.
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
                {copied ? 'Copied' : 'Copy referral address'}
              </Button>
            </CopyToClipboard>
          </div>
          <div className={s.copy}>
            <Button
              size="small"
              styl="secondary"
              onClick={() => openInvitePopup()}>Invite referrals by email</Button>
          </div>
        </div>
      </div>
    );
  }
};

export default Address;
