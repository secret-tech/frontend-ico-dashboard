import React, { Component } from 'react';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { InputGroup, Button, Intent } from '@blueprintjs/core';

import { closeMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import Popup from '../../../containers/common/Popup';

import s from './styles.scss';


class MakeDepositPopup extends Component {
  constructor(props) {
    super(props);
    this.state = { isCopied: false };
  }

  render() {
    const {
      t,
      open,
      closeMakeDepositPopup,
      ethAddress
    } = this.props;

    const { isCopied } = this.state;

    return (
      <Popup
        title={t('makeDepositPopup.title')}
        isOpen={open}
        onClose={closeMakeDepositPopup}>
        <div>
          <div className={s.text}>
            {t('makeDepositPopup.description')}
          </div>

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
        </div>
      </Popup>
    );
  }
}


const TranslatedComponent = translate('app')(MakeDepositPopup);
export default connect(
  (state) => ({
    open: state.app.makeDepositPopup.open,
    ethAddress: state.app.app.user.ethAddress
  }),
  {
    closeMakeDepositPopup
  }
)(TranslatedComponent);
