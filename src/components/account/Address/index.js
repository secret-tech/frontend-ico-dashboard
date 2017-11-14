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
    const { address } = this.props;
    const { copied } = this.state;

    return (
      <div className={s.address}>
        <div className={s.title}>My ETH Wallet Address</div>

        <div className={s.body}>
          <Input
            disabled
            value={address}/>
          <div className={s.copy}>
            <CopyToClipboard
              text={address}
              onCopy={() => this.setState({ copied: true })}>
              <Button size="small">
                { copied ? 'Copied' : 'Copy to clipboard' }
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </div>
    );
  }
}

export default Address;
