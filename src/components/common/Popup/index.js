import React, { Component } from 'react';
import { Dialog } from '@blueprintjs/core';

class Popup extends Component {
  render() {
    const {
      title,
      children,
      open,
      close,
      icon
    } = this.props;

    return (
      <Dialog
        icon={icon}
        isOpen={open}
        onClose={close}
        title={title}
      >
        <div className="pt-dialog-body">
          {children}
        </div>
      </Dialog>
    );
  }
}

export default Popup;
