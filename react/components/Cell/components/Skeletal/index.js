import styled from 'styled-components';

import Box from 'react/components/UI/Box';

const Container = styled(Box).attrs({
  mb: 8,
})`
  ${props => `
    width: ${props.theme.constantValues.blockWidth};
    height: ${props.theme.constantValues.blockWidth};
  `}
`;

export default Container;
