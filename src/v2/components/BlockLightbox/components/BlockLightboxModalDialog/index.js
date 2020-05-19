import React from 'react'
import Box from 'v2/components/UI/Box'

export default ({ children, ...rest }) => (
  <Box position="relative" width="100%" height="100%" {...rest}>
    {children}
  </Box>
)
