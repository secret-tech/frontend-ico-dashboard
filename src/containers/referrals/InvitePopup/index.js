import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import { closeInvitePopup, inviteUsers } from '../../../redux/modules/referrals/invitePopup';

import Popup from '../../../components/common/Popup';
import EmailsInput from '../../common/EmailsInput';
import Button from '../../../components/common/Button';

const InvitePopup = (props) => {
  const {
    open,
    spinner,
    closeInvitePopup,
    inviteUsers
  } = props;

  return (
    <Popup
      title="Invite Referrals"
      open={open}
      close={() => closeInvitePopup()}>
      <div>
        <div className={s.text}>You can invite people by email.</div>

        <EmailsInput placeholder="Enter emails"/>

        <div className={s.tip}>Double click on email to delete them</div>

        <Button
          spinner={spinner}
          onClick={() => inviteUsers()}
          type="button">Invite</Button>
      </div>
    </Popup>
  );
};

export default connect(
  (state) => ({
    open: state.referrals.invitePopup.open,
    spinner: state.referrals.invitePopup.spinner
  }),
  {
    closeInvitePopup,
    inviteUsers
  }
)(InvitePopup);
