import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { openInvitePopup } from '../../../redux/modules/referrals/invitePopup';

import Address from '../../../components/referrals/Address';
import Counter from '../../../components/referrals/Counter';
import Users from '../Users';
import InvitePopup from '../InvitePopup';

class Referrals extends Component {
  render() {
    const {
      openInvitePopup
    } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div className={s.address}>
            <Address
              address="https://jincor.com/hash"
              openInvitePopup={() => openInvitePopup()}/>
          </div>

          <div className={s.users}>
            <Users/>
          </div>
        </div>
        <div className={s.col}>
          <Counter
            earned={150}
            referralsQty={2}/>
        </div>

        <InvitePopup/>
      </div>
    );
  }
}

export default connect(
  null,
  {
    openInvitePopup
  }
)(Referrals);
