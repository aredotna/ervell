import React from 'react';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

export default props => (
  <Box {...props}>
    <Text f={4}>
      <strong>
        <a href="/sign_up">
          Join
        </a>
      </strong>

      {' or '}

      <strong>
        <a href="/log_in">
          Log in
        </a>
      </strong>
    </Text>
  </Box>
);
