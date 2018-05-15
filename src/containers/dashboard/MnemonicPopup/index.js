import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.scss';

import { required } from '../../../utils/validators';

import { closeMnemonicPopup, initiateBuyTokens } from '../../../redux/modules/dashboard/buyTokens';

import Popup from '../../../containers/common/Popup';
import RenderPassword from '../../../components/forms/RenderPassword';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class MnemonicPopup extends Component {
  componentWillReceiveProps(nextProps) {
    const { change, open, ethAmount } = nextProps;

    if (open && ethAmount) {
      change('ethAmount', ethAmount);
    }
  }

  render() {
    const {
      t,
      open,
      handleSubmit,
      closeMnemonicPopup,
      spinner,
      invalid
    } = this.props;

    return (
      <Popup
        title="Enter your mnemonic phrase"
        open={open}
        close={() => closeMnemonicPopup()}>
        <form onSubmit={handleSubmit(initiateBuyTokens)}>
          <Field
            component={RenderPassword}
            name="mnemonic"
            placeholder="Mnemonic phrase"
            validate={required} />

          <Field
            component={RenderInput}
            name="ethAmount"
            type="hidden" />

          <p>
            You can find your mnemonic phrase in a secret_tech_wallet.txt file which
            was downloaded to your PC automatically during the registration process.
          </p>
          <div className={s.button}>
            <Button type="submit" spinner={spinner} disabled={invalid}>{t('buy')}</Button>
          </div>
        </form>
      </Popup>
    );
  }
}

const FormComponent = reduxForm({
  form: 'buyTokensMnemonic',
  initialValues: {
    mnemonic: '',
    ethAmount: 0
  }
})(MnemonicPopup);

const TranslatedComponent = translate('dashboard')(FormComponent);

export default connect(
  (state) => ({
    open: state.dashboard.buyTokens.mnemonicPopupOpen,
    spinner: state.dashboard.buyTokens.spinner,
    ethAmount: state.dashboard.buyTokens.eth
  }),
  {
    closeMnemonicPopup
  }
)(TranslatedComponent);
