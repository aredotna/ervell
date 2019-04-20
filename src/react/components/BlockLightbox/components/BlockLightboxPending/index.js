import React from 'react';

import Box from 'react/components/UI/Box';
import LoadingIndicator from 'react/components/UI/LoadingIndicator';

export default () => (
  <Box
    p={6}
    width="100%"
    height="100%"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <LoadingIndicator f={6} />
  </Box>
);
