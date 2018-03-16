import React, { Component } from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import ModalDialog from 'react/components/UI/ModalDialog';

const ModalBackdrop = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  background-color: rgba(255, 255, 255, 0.9);
  z-index: 6001;
  transform: translate3d(0, 0, 1px);
`;

export default class Modal extends Component {
  static propTypes = {
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
  }

  ModalDialog = ModalDialog

  render() {
    const { children, onClose, ...rest } = this.props;

    return (
      <ModalBackdrop {...rest} onClick={onClose}>
        <this.ModalDialog
          onClick={e => e.stopPropagation()}
          role="dialog"
        >
          {children}
        </this.ModalDialog>
      </ModalBackdrop>
    );
  }
}
