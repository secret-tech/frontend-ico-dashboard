import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { InputGroup, Button, Intent } from '@blueprintjs/core';

import s from './styles.scss';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = { isCopied: false };
  }

  render() {
    const { address } = this.props;
    const { isCopied } = this.state;

    return (
      <div className={s.address}>
        <InputGroup
          large
          disabled
          value={address}
          rightElement={
            <CopyToClipboard
              text={address}
              onCopy={() => this.setState({ isCopied: true })}>
              <Button
                minimal
                large
                intent={Intent.PRIMARY}
                icon={isCopied ? 'saved' : 'clipboard'}/>
            </CopyToClipboard>
          }/>
      </div>
    );
  }
}

export default Address;
