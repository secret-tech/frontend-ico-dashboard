import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@blueprintjs/core';
import cx from 'classnames';
import s from './styles.scss';

class Popup extends Component {
  render() {
    const {
      theme,
      title,
      children,
      open,
      close,
      icon,
      ...restProps
    } = this.props;

    return (
      <Dialog
        icon={icon}
        isOpen={open}
        onClose={close}
        title={title}
        className={theme}
        {...restProps}
      >
        <div className={cx('pt-dialog-body', s.noFooter)}>
          {children}
        </div>
      </Dialog>
    );
  }
}

export default connect((state) => ({
  ...state.app.theme
}))(Popup);
