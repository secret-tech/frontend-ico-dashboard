import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Callout } from '@blueprintjs/core';

import Block from '../../../components/dashboard/Block';

import { bigNum } from '../../../helpers/common/common';

const Summary = (props) => {
  const {
    t,
    users,
    referralCount,
    fetching
  } = props;

  const earned = users.reduce((acc, val) => acc + Number(val.tokens), 0);

  return (
    <Callout title={t('counter.title')}>
      <Block
        label={t('counter.earned')}
        value={`${bigNum(earned, 0)} ${t('counter.tokenName')}`}
        fetching={fetching}/>

      <Block
        label={t('counter.referrals')}
        value={referralCount}
        fetching={fetching}/>
    </Callout>
  );
};

const TranslatedComponent = translate('referrals')(Summary);
export default connect((state) => ({
  ...state.referrals.referrals
}))(TranslatedComponent);
