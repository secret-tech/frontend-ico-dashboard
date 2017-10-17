import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { openInvitePopup } from '../../../redux/modules/referrals/invitePopup';
import { fetchReferrals } from '../../../redux/modules/referrals/referrals';

import Address from '../../../components/referrals/Address';
import Counter from '../../../components/referrals/Counter';
import Users from '../Users';
import InvitePopup from '../InvitePopup';

class Referrals extends Component {
  componentWillMount() {
    const { fetchReferrals } = this.props;

    fetchReferrals();
  }

  _getTotalEarned() {
    return this.props.users.reduce((acc, val) => acc + Number(val.tokens), 0);
  }

  render() {
    const {
      refCode,
      users,
      openInvitePopup
    } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.address}>
            <Address
              address={`localhost:3000/auth/signup/${refCode}`}
              openInvitePopup={() => openInvitePopup()}/>
          </div>

          <div className={s.users}>
            <Users/>
          </div>
        </div>
        <div className={s.col}>
          <Counter
            earned={this._getTotalEarned()}
            referralsQty={users.length}/>
        </div>

        <InvitePopup/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    refCode: state.referrals.referrals.refCode,
    users: state.referrals.referrals.users
  }),
  {
    openInvitePopup,
    fetchReferrals
  }
)(Referrals);
