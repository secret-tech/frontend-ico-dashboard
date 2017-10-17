import React from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import s from './styles.css';

import Input from '../../common/Input';
import Button from '../../common/Button';

const Address = (props) => {
  const { address } = props;

  return (
    <div className={s.address}>
      <div className={s.title}>My ETH Wallet Address</div>

      <div className={s.body}>
        <Input
          disabled
          value={address}/>
        <div className={s.copy}>
          <CopyToClipboard text={address}>
            <Button size="small">Copy address</Button>
          </CopyToClipboard>
        </div>
      </div>
    </div>
  );
};

export default Address;
