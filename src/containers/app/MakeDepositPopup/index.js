import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import { closeMakeDepositPopup } from '../../../redux/modules/app/makeDepositPopup';

import Popup from '../../../components/common/Popup';
import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

class MakeDepositPopup extends Component {
  constructor(props) {
    super(props);

    this.state = {
      copied: false
    };
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ethAddress !== nextProps.ethAddress) {
      this.props.change('ethAddress', nextProps.ethAddress);
    }
  }

  render() {
    const {
      t,
      open,
      closeMakeDepositPopup,
      ethAddress
    } = this.props;
    const { copied } = this.state;

    return (
      <Popup
        title={t('makeDepositTitle')}
        open={open}
        close={() => closeMakeDepositPopup()}>
        <div>
          <div className={s.text}>
            {t('makeDepositText')}
          </div>

          <Field
            disabled
            component={RenderInput}
            name="ethAddress"
            type="text"/>

          <div className={s.button}>
            <CopyToClipboard
              text={ethAddress}
              onCopy={() => this.setState({ copied: true })}>
              <Button>
                {copied ? t('copied') : t('copyAddress')}
              </Button>
            </CopyToClipboard>
          </div>
        </div>
      </Popup>
    );
  }
}

const FormComponent = reduxForm({
  form: 'makeDeposit',
  initialValues: {
    ethAddress: ''
  }
})(MakeDepositPopup);

const TranslatedComponent = translate('app')(FormComponent);

export default connect(
  (state) => ({
    open: state.app.makeDepositPopup.open,
    ethAddress: state.app.app.user.ethAddress
  }),
  {
    closeMakeDepositPopup
  }
)(TranslatedComponent);
