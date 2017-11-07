import React, { Component } from 'react';
import { connect } from 'react-redux';
import s from './styles.css';

import {
  validateEmail,
  addEmails,
  handleEmailRemove,
  setInputWidth,
  keyPress,
  selectEmail,
  unselectEmail,
  removeEmail
} from '../../../redux/modules/common/emailsInput';

import EmailItem from './components/EmailItem';

class EmailsInput extends Component {
  constructor(props) {
    super(props);

    this.EMAIL_ITEM_RIGTH_PEDDING = 9;
    this.handleChange = this.handleChange.bind(this);
    this.handleBackspace = this.handleBackspace.bind(this);
  }

  componentDidMount() {
    const { setInputWidth } = this.props;
    setInputWidth(this.textarea.clientWidth);
  }

  componentDidUpdate() {
    const { value, setInputWidth, inputWidth } = this.props;

    const hiddenInputWidth = this.calcInputValueWidth(value);
    const availableWidth = this.calcAvailableSpace();
    const textareaWidth = this.textarea.clientWidth;

    if (availableWidth !== inputWidth || hiddenInputWidth > inputWidth) {
      const width = hiddenInputWidth > availableWidth
        ? textareaWidth
        : availableWidth;

      setInputWidth(width);
    }
  }

  handleChange(e) {
    const { validateEmail } = this.props;
    validateEmail(e.currentTarget.value);
  }

  handleBackspace(e) {
    const { handleEmailRemove } = this.props;

    if (e.key === 'Backspace' || e.key === 'Delete') {
      handleEmailRemove(e.key);
    }
  }

  handleEmailClick(e, index) {
    const {
      selectedEmail,
      selectEmail,
      removeEmail
    } = this.props;
    e.stopPropagation();

    if (selectedEmail !== index) {
      selectEmail(index);
    } else {
      removeEmail(index);
    }

    this.textareaValue.focus();
  }

  calcInputValueWidth(value) {
    this.input.innerText = value;
    return this.input.clientWidth;
  }

  calcAvailableSpace() {
    const textareaWidth = this.textarea.clientWidth;

    let child = this.textarea.firstElementChild;
    let rowWidth = 0;

    while (child.tagName !== 'INPUT') {
      const emailWidth = child.offsetWidth + this.EMAIL_ITEM_RIGTH_PEDDING;

      rowWidth = textareaWidth > rowWidth + emailWidth
        ? rowWidth + emailWidth
        : emailWidth;

      child = child.nextElementSibling;
    }

    return textareaWidth - rowWidth;
  }

  render() {
    const {
      value,
      emails,
      placeholder,
      inputWidth,
      selectedEmail
    } = this.props;

    return (
      <div className={s.wrapper}>
        <div className={s.emailsInput} ref={(textarea) => { this.textarea = textarea; }}>
          {emails.map((email, i) => (
            <EmailItem
              key={i}
              email={email}
              selected={i === selectedEmail}
              onClick={(e) => this.handleEmailClick(e, i)}/>
          ))}

          <input
            ref={(t) => { this.textareaValue = t; }}
            style={{ width: inputWidth }}
            className={s.input}
            value={value}
            onChange={this.handleChange}
            onKeyDown={this.handleBackspace}
            placeholder={emails.length === 0 ? placeholder : ''}
            disabled={emails.length >= 5}/>

          <div
            ref={(input) => { this.input = input; }}
            className={s.inputHidden}/>

          <div
            ref={(email) => { this.emailItem = email; }}
            className={s.emailItemHidden}/>
        </div>
      </div>
    );
  }
}

export default connect(
  (state) => state.common.emailsInput,
  {
    validateEmail,
    addEmails,
    handleEmailRemove,
    setInputWidth,
    keyPress,
    selectEmail,
    unselectEmail,
    removeEmail
  }
)(EmailsInput);
