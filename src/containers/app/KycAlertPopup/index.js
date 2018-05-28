import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';
import * as routes from '../../../routes';

import { closeKycAlertPopup } from '../../../redux/modules/app/kycAlertPopup';

import Popup from '../../../containers/common/Popup';
import Button from '../../../components/common/Button';

const KycAlertPopup = (props) => {
  const { t, open, closeKycAlertPopup } = props;

  return (
    <Popup
      title={t('kycAlertPopup.title')}
      icon="info-sign"
      isOpen={open}
      onClose={closeKycAlertPopup}>
      <div>
        {t('kycAlertPopup.message')}
      </div>
      <div className={s.button}>
        <Button onClick={() => closeKycAlertPopup()} to={routes.KYC_VERIFICATION}>
          {t('kycAlertPopup.button')}
        </Button>
      </div>
    </Popup>
  );
};

const TranslatedComponent = translate('app')(KycAlertPopup);

export default connect(
  (state) => ({
    open: state.app.kycAlertPopup.open
  }),
  {
    closeKycAlertPopup
  }
)(TranslatedComponent);
