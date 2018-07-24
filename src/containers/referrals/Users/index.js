import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import { Tab, Tabs } from '@blueprintjs/core';

import { changeTab } from '../../../redux/modules/referrals/referrals';

import User from '../../../components/referrals/User';

import s from './styles.scss';


const Users = (props) => {
  const {
    t,
    changeTab,
    tab,
    users
  } = props;

  const getUsersSortedByDate = (users) =>
    [].concat(users).slice().sort((a, b) => b.date - a.date);

  const getUsersSortedByTokens = (users) =>
    [].concat(users).slice().sort((a, b) => b.tokens - a.tokens);

  return (
    <div className={s.wrapper}>
      <Tabs id="referrals" onChange={changeTab} selectedTabId={tab}>
        <Tab id="dateSort" title={t('users.latest')} panel={
          <div>
            {getUsersSortedByDate(users).map((user, i) =>
              <User key={`${user.date}-${i}`} date={user.date} {...user} />)}
          </div>
        } />
        <Tab id="valSort" title={t('users.most')} panel={
          <div>
            {getUsersSortedByTokens(users).map((user, i) =>
              <User key={`${user.date}-${i}`} date={user.date} {...user} />)}
          </div>
        } />
      </Tabs>
    </div>
  );
};


const TranslatedComponent = translate('referrals')(Users);
export default connect(
  (state) => ({
    tab: state.referrals.referrals.tab,
    users: state.referrals.referrals.users
  }),
  { changeTab }
)(TranslatedComponent);
