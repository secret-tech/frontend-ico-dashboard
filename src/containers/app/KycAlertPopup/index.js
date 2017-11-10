import React from 'react';
import { connect } from 'react-redux';
import s from './styles.css';
import { namedRoutes } from '../../../routes';

import { closeKycAlertPopup } from '../../../redux/modules/app/kycAlertPopup';

import Popup from '../../../components/common/Popup';
import Button from '../../../components/common/Button';

const KycAlertPopup = (props) => {
  const { open, closeKycAlertPopup } = props;

  return (
    <Popup
      open={open}
      close={() => closeKycAlertPopup()}>
      <div>
        <div className={s.alert}/>
        <div className={s.title}>One more thing</div>
        <div className={s.text}>
          To buy tokens you need to verify your account. It takes a few minutes.
        </div>
        <div className={s.button}>
          <Button onClick={() => closeKycAlertPopup()} to={namedRoutes.verification}>Verify</Button>
        </div>
      </div>
    </Popup>
  );
};

export default connect(
  (state) => ({
    open: state.app.kycAlertPopup.open
  }),
  {
    closeKycAlertPopup
  }
)(KycAlertPopup);
