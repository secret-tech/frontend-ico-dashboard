import React from 'react';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';
import { namedRoutes } from '../../../routes';

import { closeKycAlertPopup } from '../../../redux/modules/app/kycAlertPopup';

import Popup from '../../../components/common/Popup';
import Button from '../../../components/common/Button';

const KycAlertPopup = (props) => {
  const { t, open, closeKycAlertPopup } = props;

  return (
    <Popup
      open={open}
      close={() => closeKycAlertPopup()}>
      <div>
        <div className={s.alert}/>
        <div className={s.title}>{t('kycAlertTitle')}</div>
        <div className={s.text}>
          {t('kycAlertText')}
        </div>
        <div className={s.button}>
          <Button onClick={() => closeKycAlertPopup()} to={namedRoutes.verification}>{t('verify')}</Button>
        </div>
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
