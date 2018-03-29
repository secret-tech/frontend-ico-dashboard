import React, { Component } from 'react';
import { translate } from 'react-i18next';
import s from './styles.css';

class Popup extends Component {
  constructor(props) {
    super(props);

    this._handleBackdropClick = this._handleBackdropClick.bind(this);
  }

  componentWillReceiveProps(nextProps) {
    if (nextProps.open) {
      document.body.classList.add('popupOpened');
    } else {
      document.body.classList.remove('popupOpened');
    }
  }

  _handleBackdropClick(e) {
    if (this.popup.contains(e.target)) {
      return;
    }

    this.props.close();
  }

  render() {
    const {
      t,
      title,
      children,
      open,
      close
    } = this.props;

    const renderPopup = () => (
      <div className={s.background} onClick={this._handleBackdropClick}>
        <div className={s.popup} ref={(popup) => { this.popup = popup; }}>
          {title && <div className={s.title}>{title}</div>}
          <div className={s.body}>{children}</div>
          <div className={s.footer}>
            <button className={s.close} type="button" onClick={() => close()}>
              <img src={require('./images/close.svg')}/>
              <span>{t('close')}</span>
            </button>
          </div>
        </div>
      </div>
    );

    return open && renderPopup();
  }
}

const TranslatedComponent = translate('common')(Popup);

export default TranslatedComponent;
