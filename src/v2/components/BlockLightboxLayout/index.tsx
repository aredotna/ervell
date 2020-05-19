import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'

export type LightboxContext = 'MODAL' | 'PAGE'
export type LightboxLayout = 'DEFAULT' | 'FULLSCREEN'

interface BlockLightboxLayoutProps {
  context?: LightboxContext
  layout: LightboxLayout
  children: React.ReactNode
}

export const LightboxContainer = styled(Box).attrs({
  flexDirection: ['column', 'row', 'row'],
  height: ['unset', '100%', '100%'],
  display: ['block', 'flex', 'flex'],
})``

export const SidebarContainer = styled(Box).attrs({
  flex: 1,
  px: 7,
  pt: 4,
  pb: 8,
  height: '100%',
  bg: 'white',
  overflowScrolling: true,
})``

export const MetadataContainer = styled(Box).attrs({
  flex: 1,
  px: 7,
  pt: 8,
  pb: 8,
  height: '100%',
  bg: 'white',
  overflowScrolling: true,
})``

export const ContentContainer = styled(Box).attrs({
  minHeight: ['75vh', 'auto', 'auto'],
  maxHeight: ['auto', 'auto', 'auto'],
  mb: [8, 0, 0],
})`
  position: relative;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  ${props =>
    props.layout === 'FULLSCREEN' &&
    `
    background-color: ${props.theme.colors.gray.bold};
  `}
`

interface TextBoxContainerProps {
  onClick?: (e: any) => void
}

export const TextBoxContainer: React.FC<BlockLightboxLayoutProps &
  TextBoxContainerProps> = ({ children, layout, onClick }) => {
  return (
    <Box height="100%" width="100%">
      <Box
        height={['auto', '100%']}
        width="100%"
        py={9}
        px={[3, 9]}
        overflowScrolling
      >
        <Box
          minHeight="100%"
          width={{ DEFAULT: '100%', FULLSCREEN: '75%' }[layout]}
          maxWidth="55em"
          bg={{ DEFAULT: 'white' }[layout]}
          border="1px solid"
          borderColor={
            { DEFAULT: 'gray.light', FULLSCREEN: 'gray.semiBold' }[layout]
          }
          px={7}
          py={6}
          mx="auto"
          overflow="hidden"
          position="relative"
          onClick={onClick}
        >
          {children}
        </Box>
      </Box>
    </Box>
  )
}
