import React from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';

import constants from 'react/styles/constants';
import { multiply } from 'react/styles/functions';

const { blockGutter, blockWidth } = constants;

const Container = styled.div`
  position: relative;
  width: ${blockWidth};

  ${props => `
    margin: 0 ${blockGutter} ${multiply(blockGutter, props.gutterSpacing)} ${blockGutter};
    ${!props.variableHeight && `height: ${blockWidth};`}
  `}
`;

const GridItem = ({ children, gutterSpacing, ...rest }) => (
  <Container
    gutterSpacing={gutterSpacing}
    variableHeight
    {...rest}
  >
    {children}
  </Container>
);

GridItem.propTypes = {
  children: PropTypes.node.isRequired,
  gutterSpacing: PropTypes.number,
};

GridItem.defaultProps = {
  gutterSpacing: 4,
};

export default GridItem;
