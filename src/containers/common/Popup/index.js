import React from 'react';
import { connect } from 'react-redux';
import { Dialog } from '@blueprintjs/core';

const Popup = ({ children, theme, ...props }) => (
  <Dialog
    className={theme}
    {...props}>
    <div className="pt-dialog-body">
      {children}
    </div>
  </Dialog>
);

export default connect((state) => ({
  ...state.app.theme
}))(Popup);
