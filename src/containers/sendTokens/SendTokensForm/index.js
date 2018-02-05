import React from 'react';
import { reduxForm, Field } from 'redux-form';
import { connect } from 'react-redux';
import { translate } from 'react-i18next';
import s from './styles.css';

import RenderInput from '../../../components/forms/RenderInput';
import Button from '../../../components/common/Button';

const BuyTokensForm = (props) => {
  console.log(props);

  const { t } = this.props;

  return (
    <div>
      <div className={s.title}>{t('purchaseTokens')}</div>
      <form>
        <div className={s.field}>
          <Field
            component={RenderInput}
            size="large"
            name="amount"
            placeholder={`0 ${t('tokens')}`}/>
        </div>

        <div className={s.field}>
          <Field
            component={RenderInput}
            size="large"
            name="address"
            placeholder={t('walletAddress')}/>
        </div>

        <div className={s.button}>
          <Button>{t('sendTokens')}</Button>
        </div>
      </form>

      <div className={s.tip}>
        <p>
          {t('gasInfo')}
        </p>
      </div>
    </div>
  );
};

const FormComponent = reduxForm({
  form: 'sendTokensVerify',
  initialValues: {
    amount: '',
    address: ''
  }
})(BuyTokensForm);

const TranslatedComponent = translate('sendTokens')(FormComponent);

export default connect(null)(TranslatedComponent);
