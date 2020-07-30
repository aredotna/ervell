import React from 'react'

import Box from 'v2/components/UI/Box'
import {
  BlockLightboxLayoutProps,
  TextBoxContainerProps,
} from 'v2/components/BlockLightboxLayout'

export const ReaderContainer: React.FC<BlockLightboxLayoutProps &
  TextBoxContainerProps> = ({ children, layout, onClick, border = true }) => {
  return (
    <Box height="100%" width="100%">
      <Box
        height={['auto', '100%']}
        width="100%"
        pt={6}
        pr={[4, 9]}
        pb={[6, 7]}
        pl={[4, 9]}
        overflowScrolling
        bg={{ DEFAULT: 'transparent', FULLSCREEN: 'background' }[layout]}
      >
        <Box
          minHeight="100%"
          width={{ DEFAULT: '100%', FULLSCREEN: '75%' }[layout]}
          maxWidth="55em"
          bg="background"
          border={border && '1px solid'}
          borderColor={
            border &&
            { DEFAULT: 'gray.light', FULLSCREEN: 'gray.semiBold' }[layout]
          }
          px={7}
          py={6}
          mx="auto"
          overflow="hidden"
          position="relative"
          onClick={onClick}
          display="flex"
          flexDirection="column"
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
