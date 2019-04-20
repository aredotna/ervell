import React from 'react';
import styled from 'styled-components';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

const Container = styled(Box)`
  display: flex;
  align-items: center;
`;

export default props => (
  <Container {...props}>
    <Text f={4}>
      <strong>
        <a href="/sign_up">
          Sign up
        </a>
      </strong>

      {' or '}

      <strong>
        <a href="/log_in">
          Log in
        </a>
      </strong>
    </Text>
  </Container>
);
