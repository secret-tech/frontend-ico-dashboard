import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Callout, Button, Intent } from '@blueprintjs/core';

import Block from '../../../components/dashboard/Block';

import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import s from './styles.scss';
import { bigNum } from '../../../helpers/common/common';

const BalanceInfo = (props) => {
  const {
    t,
    fetching,
    openMakeDepositPopup,
    ethBalance,
    tokenBalance
  } = props;

  return (
    <Callout title={t('balanceInfo.title')}>
      <div className={s.block}>
        <Block
          label={t('balanceInfo.eth')}
          value={`${bigNum(ethBalance)} ETH`}
          fetching={fetching}
          placeholderWidth={{ val: 160, label: 83 }}/>
      </div>

      <div className={s.block}>
        <Block
          label={t('balanceInfo.token')}
          value={`${bigNum(tokenBalance, 2)} SPACE`}
          fetching={fetching}
          placeholderWidth={{ val: 132, label: 93 }}/>
      </div>

      <Button
        size="small"
        icon="plus"
        minimal={true}
        text={t('balanceInfo.deposit')}
        intent={Intent.PRIMARY}
        onClick={() => openMakeDepositPopup()}/>
    </Callout>
  );
};

const TranslatedComponent = translate('dashboard')(BalanceInfo);
export default connect(
  (state) => ({
    ...state.dashboard.dashboard
  }),
  {
    openMakeDepositPopup
  }
)(TranslatedComponent);
