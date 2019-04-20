import styled from 'styled-components';

import Box from 'react/components/UI/Box';

const FixedWrapper = styled(Box)`
  position: fixed;
  ${props => props.top && 'top: 0;'}
  ${props => props.bottom && 'bottom: 0;'}
  right: 0;
  left: 0;
  z-index: 1;
`;

FixedWrapper.defaultProps = {
  bg: 'white',
};

export default FixedWrapper;
