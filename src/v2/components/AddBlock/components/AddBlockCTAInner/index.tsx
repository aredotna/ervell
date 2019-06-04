import React from 'react'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

export const AddBlockCTAInner = () => {
  return (
    <Box
      flex="1"
      display="flex"
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      width="100%"
      height="100%"
    >
      <Text mt={7} f={5} color="gray.medium">
        You’ve reached your limit of free blocks
      </Text>
    </Box>
  )
}
