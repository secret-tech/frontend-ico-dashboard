import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Callout } from '@blueprintjs/core';

import Block from '../../../components/dashboard/Block';

import { openMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import { bigNum } from '../../../helpers/common/common';

const IcoStatus = (props) => {
  const {
    t,
    fetching,
    tokenPrice,
    tokensSold,
    raised,
    daysToGo
  } = props;

  return (
    <Callout title={t('icoStatus.title')}>
      <Block
        label={t('icoStatus.price')}
        value={`${bigNum(tokenPrice.ETH, 3)} ETH / ${bigNum(tokenPrice.USD, 1)}$`}
        fetching={fetching}/>

      <Block
        label={t('icoStatus.sold')}
        value={`${bigNum(tokensSold, 0)} SPACE`}
        fetching={fetching}/>

      <Block
        label={t('icoStatus.raised')}
        value={`${bigNum(raised.ETH, 3)} ETH`}
        fetching={fetching}/>

      {daysToGo > 0
        ? <Block label={t('icoStatus.days')} value={daysToGo} fetching={fetching}/>
        : null}
    </Callout>
  );
};


const TranslatedComponent = translate('dashboard')(IcoStatus);
export default connect(
  (state) => ({
    ...state.dashboard.dashboard
  }),
  {
    openMakeDepositPopup
  }
)(TranslatedComponent);
