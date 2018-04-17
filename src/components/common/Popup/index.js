import React, { Component } from 'react';
import { Dialog } from '@blueprintjs/core';
import cx from 'classnames';
import s from './styles.scss';

class Popup extends Component {
  render() {
    const {
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
        {...restProps}
      >
        <div className={cx('pt-dialog-body', s.noFooter)}>
          {children}
        </div>
      </Dialog>
    );
  }
}

export default Popup;
