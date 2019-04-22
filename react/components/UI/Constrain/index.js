import styled from 'styled-components';

import { multiply, add } from 'react/styles/functions';
import constants from 'react/styles/constants';

import Box from 'react/components/UI/Box';

const BREAKPOINTS = new Array(8).fill(undefined).map((_, i) => {
  const maxWidth = multiply(constants.blockAndGutter, i);
  const minWidth = add(constants.legacyUnit, maxWidth);
  return `@media (min-width: ${minWidth}) { max-width: ${maxWidth}; }`;
}).join('');

const Constrain = styled(Box)`
  ${BREAKPOINTS}
`;

Constrain.defaultProps = {
  my: 0,
  mx: 'auto',
};

export default Constrain;
