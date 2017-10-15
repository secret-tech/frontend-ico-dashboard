import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { closeInvitePopup } from '../../../redux/modules/referrals/invitePopup';

import Popup from '../../../components/common/Popup';
import EmailsInput from '../../common/EmailsInput';
import Button from '../../../components/common/Button';

const InvitePopup = (props) => {
  const { open, closeInvitePopup } = props;

  return (
    <Popup
      title="Invite Referrals"
      open={open}
      close={() => closeInvitePopup()}>
      <div>
        <div className={s.text}>You can invite people by email.</div>

        <EmailsInput placeholder="Enter emails"/>
        <Button type="button">Invite</Button>
      </div>
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
