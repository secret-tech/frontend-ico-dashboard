import React, { Component } from 'react';
import { reduxForm, Field, FormSection } from 'redux-form';
import s from './styles.css';

import { required } from '../../../utils/validators';

import RenderInput from '../../forms/RenderInput';
import Button from '../../common/Button';

class verifySignIn extends Component {
  componentWillMount() {
    const {
      change,
      method,
      verificationId,
      accessToken
    } = this.props;

    change('verification.id', verificationId);
    change('verification.method', method);
    change('accessToken', accessToken);
  }

  render() {
    const {
      spinner,
      method,
      handleSubmit,
      invalid,
      error
    } = this.props;

    const renderTip = () => (
      method === 'email'
        ? 'We sent the code to your email address. Please, check your inbox or spam folder.'
        : 'Use Google Authenticator to get confirmation code.'
    );

    return (
      <div>
        <div className={s.title}>Verify Sign In</div>

        <div className={s.description}>{renderTip()}</div>

        {error && <div className={s.error}>{error}</div>}

        <form onSubmit={handleSubmit}>
          <FormSection name="verification">
            <div className={s.field}>
              <Field
                component={RenderInput}
                name="code"
                type="text"
                placeholder="Enter PIN"
                validate={required}/>
            </div>

            <Field
              component={RenderInput}
              name="id"
              type="hidden"
              disabled/>

            <Field
              component={RenderInput}
              name="method"
              type="hidden"
              disabled/>
          </FormSection>

          <Field
            component={RenderInput}
            name="accessToken"
            type="hidden"
            disabled/>

          <div className={s.button}>
            <Button type="submit" spinner={spinner} disabled={invalid}>Submit</Button>
          </div>
        </form>
      </div>
    );
  }
}

const FormComponent = reduxForm({
  form: 'verifySignIn',
  initialValues: {
    accessToken: '',
    verification: {
      id: '',
      code: '',
      method: ''
    }
  }
})(verifySignIn);

export default FormComponent;
