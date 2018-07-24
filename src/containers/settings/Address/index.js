import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Callout, InputGroup, Button, Intent } from '@blueprintjs/core';

import { CopyToClipboard } from 'react-copy-to-clipboard';

class Address extends Component {
  constructor(props) {
    super(props);
    this.state = { isCopied: false };
  }

  render() {
    const {
      t,
      ethAddress
    } = this.props;

    const { isCopied } = this.state;

    return (
      <Callout title={t('address.title')}>
        <InputGroup
          large
          disabled
          value={ethAddress}
          rightElement={
            <CopyToClipboard
              text={ethAddress}
              onCopy={() => this.setState({ isCopied: true })}>
              <Button
                minimal
                large
                intent={Intent.PRIMARY}
                icon={isCopied ? 'saved' : 'clipboard'}/>
            </CopyToClipboard>
          }/>
      </Callout>
    );
  }
}

const TranslatedComponent = translate('settings')(Address);
export default connect(
  (state) => ({
    ethAddress: state.app.app.user.ethAddress
  }),
  null
)(TranslatedComponent);
