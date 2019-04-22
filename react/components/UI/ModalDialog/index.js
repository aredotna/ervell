import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { width, height, maxHeight, maxWidth } from 'styled-system';

import { preset } from 'react/styles/functions';

import constants from 'react/styles/constants';

const Dialog = styled.div`
  display: flex;
  box-sizing: border-box;
  padding: 5px; // Fake border
  overflow: hidden;
  border-radius: 0.25em;
  background-color: ${x => x.theme.colors.gray.semiLight};
  ${preset(width, { width: '90%' })}
  ${preset(height, { height: '90%' })}
  ${preset(maxWidth, { maxWidth: '40em' })}
  ${preset(maxHeight, { maxHeight: '60em' })}

  ${constants.media.mobile`
    width: 95%;
    height: 95%;
    max-width: 100%;
    max-height: 100%;
    border-radius: 0;
    padding: 0;
  `}
`;

const Content = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: white;
  border: 1px solid ${x => x.theme.colors.gray.regular};
`;

const ModalDialog = ({ children, ...rest }) => (
  <Dialog {...rest}>
    <Content>
      {children}
    </Content>
  </Dialog>
);

ModalDialog.propTypes = {
  children: PropTypes.node.isRequired,
};

export default ModalDialog;
