import React, { Component } from 'react';
import { connect } from 'react-redux';
import { reduxForm, Field } from 'redux-form';
import { translate, Interpolate } from 'react-i18next';
import { Button, Intent } from '@blueprintjs/core';
import classnames from 'classnames/bind';

import { changeEth, openMnemonicPopup } from '../../../redux/modules/dashboard/buyTokens';

import RenderInput from '../../../components/_forms/RenderInput';
import MnemonicPopup from '../MnemonicPopup';
import VerifyBuyTokensPopup from '../VerifyBuyTokensPopup';

import { ethContribute } from '../../../utils/validators';
import { tokenCalc } from '../../../utils/numbers';
import s from './styles.scss';

const cx = classnames.bind(s);

class ContributeForm extends Component {
  render() {
    const {
      openMnemonicPopup,

      t,
      eth,
      rate,
      txFeeFetching,
      expectedTxFee,
      minInvest,
      invalid
    } = this.props;

    return (
      <div>
        <h2>{t('contributeForm.title')}</h2>
        <div>
          <Interpolate
            i18nKey="dashboard:contributeForm.description"
            useDangerouslySetInnerHTML={true}/>
        </div>

        <form>
          <div className={s.field}>
            <Field
              name="eth"
              large
              fill
              component={RenderInput}
              placeholder={t('contributeForm.form.placeholder')}
              tip={t('contributeForm.form.tip')}
              onChange={(e) => this.props.changeEth(e.target.value)}
              value={eth}
              validate={ethContribute}/>
          </div>

          <div className={s.tips}>
            <div className="pt-text-muted">
              {t('contributeForm.tips.txFee')} <b className={cx(s.tipValue, txFeeFetching && 'pt-skeleton')}>{expectedTxFee}</b> ETH
            </div>
            <div className="pt-text-muted">
              {t('contributeForm.tips.minContribution')} <b className={cx(s.tipValue, txFeeFetching && 'pt-skeleton')}>{minInvest}</b> ETH
            </div>
          </div>

          <div className={s.calc}>
            {tokenCalc(eth, rate) && eth >= minInvest
              ? <Interpolate
                  tokens={tokenCalc(eth, rate)}
                  eth={eth}
                  i18nKey="dashboard:contributeForm.calc"
                  useDangerouslySetInnerHTML={true}/>
              : null}
          </div>

          <div className={s.button}>
            <Button
              large
              rightIcon="arrow-right"
              intent={Intent.PRIMARY}
              disabled={invalid}
              onClick={() => openMnemonicPopup()}>
              {t('contributeForm.form.submit')}
            </Button>
          </div>
        </form>

        <MnemonicPopup/>
        <VerifyBuyTokensPopup/>
      </div>
    );
  }
}

const FormComponent = reduxForm({ form: 'contribute' })(ContributeForm);
const TranslatedComponent = translate('dashboard')(FormComponent);
const ConnectedComponent = connect(
  (state) => ({
    txFeeFetching: state.dashboard.txFee.fetching,
    expectedTxFee: state.dashboard.txFee.expectedTxFee,
    minInvest: state.dashboard.txFee.minInvest,
    eth: state.dashboard.buyTokens.eth,
    rate: state.dashboard.dashboard.tokenPrice.ETH
  }),
  {
    changeEth,
    openMnemonicPopup
  }
)(TranslatedComponent);

export default ConnectedComponent;
