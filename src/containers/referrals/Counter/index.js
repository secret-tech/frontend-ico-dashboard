import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Callout } from '@blueprintjs/core';

import Block from '../../../components/dashboard/Block';

import s from './styles.css';
import { bigNum } from '../../../helpers/common/common';

const Counter = (props) => {
  const {
    users,
    referralCount,
    fetching
  } = props;

  const earned = users.reduce((acc, val) => acc + Number(val.tokens), 0);

  return (
    <Callout title="Partner program summary">
      <div className={s.block}>
        <Block
          label="Earned tokens"
          value={`${bigNum(earned, 0)} SPACE`}
          fetching={fetching}
          placeholderWidth={{ val: 179, label: 75 }}/>
      </div>

      <div className={s.block}>
        <Block
          label="Total referrals"
          value={referralCount}
          fetching={fetching}
          placeholderWidth={{ val: 179, label: 75 }}/>
      </div>
    </Callout>
  );
};

const TranslatedComponent = translate('referrals')(Counter);
export default connect((state) => ({
  ...state.referrals.referrals
}))(TranslatedComponent);
