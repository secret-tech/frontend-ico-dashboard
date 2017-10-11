import React from 'react';
import { connect } from 'react-redux';

import { closeInvitePopup } from '../../../redux/modules/referrals/invitePopup';

import Popup from '../../../components/common/Popup';

const InvitePopup = (props) => {
  const { open, closeInvitePopup } = props;

  return (
    <Popup
      title="hey?"
      open={open}
      close={() => closeInvitePopup()}>
      Hello, Investor! Glad to see you!
    </Popup>
  );
};

export default connect(
  (state) => ({
    open: state.referrals.invitePopup.open
  }),
  {
    closeInvitePopup
  }
)(InvitePopup);
