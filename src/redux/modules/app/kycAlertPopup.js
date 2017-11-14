import { from } from 'seamless-immutable';
import { createReducer, createAction } from '../../../utils/actions';

export const OPEN_KYC_ALERT_POPUP = 'app/kycAlertPopup/OPEN_KYC_ALERT_POPUP';
export const CLOSE_KYC_ALERT_POPUP = 'app/kycAlertPopup/CLOSE_KYC_ALERT_POPUP';

export const openKycAlertPopup = createAction(OPEN_KYC_ALERT_POPUP);
export const closeKycAlertPopup = createAction(CLOSE_KYC_ALERT_POPUP);

const initialState = from({
  open: false
});

export default createReducer({
  [OPEN_KYC_ALERT_POPUP]: (state) => (
    state.merge({
      open: true
    })
  ),

  [CLOSE_KYC_ALERT_POPUP]: (state) => (
    state.merge({
      open: false
    })
  )
}, initialState);
