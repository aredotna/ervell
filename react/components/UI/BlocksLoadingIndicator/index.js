import styled from 'styled-components';

import constants from 'react/styles/constants';
import { multiply } from 'react/styles/functions';

import LoadingIndicator from 'react/components/UI/LoadingIndicator';

const { blockGutter, blockWidth } = constants;

export default styled(LoadingIndicator).attrs({
  frames: ['+', '++', '+++'],
  width: '100%',
  height: blockWidth,
  pb: multiply(blockGutter, 2),
})`
  min-width: 100%;
`;
