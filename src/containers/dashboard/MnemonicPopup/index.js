import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import { required } from '../../../utils/validators';

import { closeMnemonicPopup, initiateBuyTokens } from '../../../redux/modules/dashboard/buyTokens';

import Popup from '../../../components/common/Popup';
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
      invalid,
      error
    } = this.props;

    return (
      <Popup
        title="Enter your mnemonic phrase"
        open={open}
        close={() => closeMnemonicPopup()}>

        <div className={s.body}>
          {error && <div className={s.error}>{error}</div>}

          <form onSubmit={handleSubmit(initiateBuyTokens)}>
            <div className={s.field}>
              <Field
                component={RenderPassword}
                name="mnemonic"
                placeholder="Mnemonic phrase"
                validate={required}/>
            </div>

            <Field
              component={RenderInput}
              name="ethAmount"
              type="hidden"/>

            <div className={s.button}>
              <Button type="submit" spinner={spinner} disabled={invalid}>{t('buy')}</Button>
            </div>
          </form>
        </div>

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
