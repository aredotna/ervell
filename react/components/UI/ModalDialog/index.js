import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import colors from 'react/styles/colors';

const Dialog = styled.div`
  width: 90%;
  height: 90%;
  max-width: 40em;
  max-height: 60em;
  background-color: ${colors.gray.semiLight};
  border-radius: .25em;
  padding: 5px;
`;

const Content = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  background-color: white;
  border: 1px solid ${colors.gray.regular};
`;

const Component = ({ children, ...rest }) => (
  <Dialog {...rest}>
    <Content>
      {children}
    </Content>
  </Dialog>
);

Component.propTypes = {
  children: PropTypes.node.isRequired,
};

export default Component;
