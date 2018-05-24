import React, { Component } from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Callout } from '@blueprintjs/core';
import classNames from 'classnames/bind';

import { CopyToClipboard } from 'react-copy-to-clipboard';

import s from './styles.scss';

const cx = classNames.bind(s);

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

    const {
      isCopied
    } = this.state;

    const buttonClassName = cx('pt-button', 'pt-minimal', 'pt-intent-primary', 'pt-large', isCopied ? 'pt-icon-saved' : 'pt-icon-clipboard');

    return (
      <Callout title={t('address.title')}>
        <div className={s.block}>
          <div className="pt-input-group pt-large">
            <input type="text" className="pt-input pt-large" value={ethAddress} disabled/>
            <CopyToClipboard
              text={ethAddress}
              onCopy={() => this.setState({ isCopied: true })}>
              <button className={buttonClassName}/>
            </CopyToClipboard>
          </div>
        </div>
      </Callout>
    );
  }
}

const TranslatedComponent = translate('settings')(Address);
export default connect(
  (state) => ({
    ethAddress: state.app.app.user.ethAddress
  }),
  {}
)(TranslatedComponent);
