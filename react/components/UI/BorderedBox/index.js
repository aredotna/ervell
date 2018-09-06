import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';

const Inner = styled.div`
  box-sizing: border-box;
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  overflow-y: auto;
  -webkit-overflow-scrolling: touch;
  background-color: white;
  border: 1px solid ${x => x.theme.colors.gray.regular};
`;

const BorderedBox = ({ children, ...rest }) => (
  <Box bg="gray.semiLight" p="5px" borderRadius="0.25em" {...rest}>
    <Inner>{children}</Inner>
  </Box>
);

BorderedBox.propTypes = {
  children: PropTypes.node.isRequired,
};

export default BorderedBox;
