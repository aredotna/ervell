import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

import styles from 'react/styles';

const { blockGutter, blockAndGutter, containerOffset } = styles.Constants;
const { add, multiply } = styles.Functions;

const Container = styled.div`
  position: relative;
  margin: ${containerOffset} auto;
`;

// This is not "correct" and has some obvious issues (right gap)
// but is intended to match the existing implementation. Can be rethought once
// Legacy implementation is dead.
const BREAKPOINTS = [1, 2, 3, 4, 5, 6, 7, 8].map((n) => {
  const width = multiply(blockAndGutter, n);
  const minWidth = add(
    width,
    multiply(blockGutter, 2),
  );

  return `
    @media (min-width: ${minWidth}) {
      width: ${width};
    }
  `;
});

const Margin = styled.div`
  margin: 0 auto;
  ${BREAKPOINTS}
`;

const PageContainer = ({ children, ...rest }) => (
  <Container {...rest}>
    <Margin>
      {children}
    </Margin>
  </Container>
);

PageContainer.propTypes = {
  children: PropTypes.node.isRequired,
};

export default PageContainer;
