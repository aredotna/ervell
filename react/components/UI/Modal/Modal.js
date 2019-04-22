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
  background-color: ${x => x.theme.colors.utility.translucent};
  z-index: ${x => x.theme.z.modal};
`;

export default class Modal extends Component {
  static propTypes = {
    Dialog: PropTypes.oneOfType([PropTypes.func, PropTypes.object]),
    children: PropTypes.node.isRequired,
    onClose: PropTypes.func.isRequired,
  };

  static defaultProps = {
    Dialog: ModalDialog,
  }

  render() {
    const {
      Dialog, children, onClose, ...rest
    } = this.props;

    return (
      <ModalBackdrop {...rest} onClick={onClose}>
        <Dialog role="dialog" onClick={e => e.stopPropagation()}>
          {children}
        </Dialog>
      </ModalBackdrop>
    );
  }
}
