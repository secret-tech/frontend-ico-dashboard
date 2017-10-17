import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { changeTab } from '../../../redux/modules/referrals/referrals';

import User from '../../../components/referrals/User';

const Users = (props) => {
  const { changeTab, tab, users } = props;

  const getUsersSortedByDate = (users) =>
    [].concat(users).slice().sort((a, b) => b.date - a.date);

  const getUsersSortedByTokens = (users) =>
    [].concat(users).slice().sort((a, b) => b.tokens - a.tokens);

  const renderTabContent = (t) => {
    switch (t) {
      case 'dateSort':
        return (
          <div>
            {getUsersSortedByDate(users).map((user, i) =>
              <User key={`${user.date}-${i}`} date={user.date} {...user}/>)}
          </div>
        );
      case 'valSort':
        return (
          <div>
            {getUsersSortedByTokens(users).map((user, i) =>
              <User key={`${user.date}-${i}`} date={user.date} {...user}/>)}
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.tabs}>
        <div
          className={tab === 'dateSort' ? s.active : s.tab}
          onClick={() => changeTab('dateSort')}>Latest referrals</div>
        <div
          className={tab === 'valSort' ? s.active : s.tab}
          onClick={() => changeTab('valSort')}>Most valuable</div>
      </div>

      <div className={s.content}>
        {renderTabContent(tab)}
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    tab: state.referrals.referrals.tab,
    users: state.referrals.referrals.users
  }),
  { changeTab }
)(Users);
