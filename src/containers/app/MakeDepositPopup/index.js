import React, { Component } from 'react';
import { reduxForm, Field } from 'redux-form';
import { CopyToClipboard } from 'react-copy-to-clipboard';
import { connect } from 'react-redux';
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
    }
  }

  componentWillReceiveProps(nextProps) {
    if (this.props.ethAddress !== nextProps.ethAddress) {
      this.props.change('ethAddress', nextProps.ethAddress);
      console.log('update eth address!!!');
    }
  }

  render() {
    const { open, closeMakeDepositPopup, ethAddress } = this.props;
    const { copied } = this.state;

    return (
      <Popup
        title="Make Deposit"
        open={open}
        close={() => closeMakeDepositPopup()}>
        <div>
          <div className={s.text}>
            Text order to replenish your balance switch ETH on this purse:
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
                {copied ? 'Copied' : 'Copy address'}
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

export default connect(
  (state) => ({
    open: state.app.makeDepositPopup.open,
    ethAddress: state.app.app.user.ethAddress
  }),
  {
    closeMakeDepositPopup
  }
)(FormComponent);
