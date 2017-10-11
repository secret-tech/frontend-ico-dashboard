import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { changeTab } from '../../../redux/modules/referrals/users';

import User from '../../../components/referrals/User';

const Users = (props) => {
  const { changeTab, tab } = props;

  const renderTabContent = (t) => {
    switch (t) {
      case 1:
        return (<div><User/><User/><User/><User/><User/><User/><User/></div>);
      case 2:
        return (<div><User/><User/><User/></div>);
      default:
        return null;
    }
  };

  return (
    <div className={s.wrapper}>
      <div className={s.tabs}>
        <div
          className={tab === 1 ? s.active : s.tab}
          onClick={() => changeTab(1)}>Latest referrals</div>
        <div
          className={tab === 2 ? s.active : s.tab}
          onClick={() => changeTab(2)}>Most valuable</div>
      </div>

      <div className={s.content}>
        {renderTabContent(tab)}
      </div>
    </div>
  );
};

export default connect(
  (state) => ({
    tab: state.referrals.users.tab
  }),
  { changeTab }
)(Users);
