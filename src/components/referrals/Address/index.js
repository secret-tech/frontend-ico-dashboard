import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import s from './styles.css';

import Input from '../../common/Input';
import Button from '../../common/Button';

const Address = (props) => {
  const { address } = props;

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
          <CopyToClipboard text={address}>
            <Button size="small">Copy referral address</Button>
          </CopyToClipboard>
        </div>
        <div className={s.copy}>
          <Button size="small" styl="secondary">Invite referrals by email</Button>
        </div>
      </div>
    </div>
  );
};

export default Address;
