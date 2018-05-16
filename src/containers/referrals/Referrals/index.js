import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { openInvitePopup } from '../../../redux/modules/referrals/invitePopup';
import { fetchReferrals } from '../../../redux/modules/referrals/referrals';

import Address from '../../../components/referrals/Address';
import Counter from '../Counter';
import Users from '../Users';
import InvitePopup from '../InvitePopup';
import Creds from '../../../components/dashboard/Creds';

class Referrals extends Component {
  componentWillMount() {
    const { fetchReferrals } = this.props;

    fetchReferrals();
  }

  render() {
    const {
      refCode,
      users,
      openInvitePopup
    } = this.props;

    const { DOMAIN } = process.env;

    return (
      <div className={s.wrapper}>
        <div className={s.main}>
          <div>
            <h2>Partner Program</h2>

            <p>
              Become a part of secret_tech’s team and help us bring transparency
              and cost-efficiency to thousands of companies from all around the
              world. All you have to do is just invite your friends to participate
              in the crowdsale using the unique link below.
            </p>

            <p>
              This program is valid for contributions starting from X ETH.
            </p>

            <p>
              For more details, please email us directly at %PARTNERS_EMAIL% using
              the subject line "secret_tech’s Partner Program"
            </p>
          </div>

          <div className={s.address}>
            <Address
              address={`${DOMAIN}/auth/sign-up?referral=${refCode}`}
              openInvitePopup={() => openInvitePopup()}/>
          </div>

          <div className={s.users}>
            {Boolean(users.length) && <Users/>}
          </div>
        </div>

        <div className={s.col}>
          <div className={s.widget}><Counter/></div>
          <div className={s.widget}><Creds/></div>
        </div>

        <InvitePopup/>
      </div>
    );
  }
}

export default connect(
  (state) => ({
    refCode: state.referrals.referrals.refCode,
    referralCount: state.referrals.referrals.referralCount,
    users: state.referrals.referrals.users
  }),
  {
    openInvitePopup,
    fetchReferrals
  }
)(Referrals);
