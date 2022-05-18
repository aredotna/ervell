import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import constants from 'v2/styles/constants'

export type LightboxContext = 'MODAL' | 'PAGE'
export type LightboxLayout = 'DEFAULT' | 'FULLSCREEN'
export type LightboxLinkView = 'SCREENSHOT' | 'READER'

export interface FullBlockLayoutProps {
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
  bg: 'background',
  overflowScrolling: true,
})``

export const MetadataContainer = styled(Box).attrs({
  flex: 1,
  px: 7,
  pt: 9,
  pb: 8,
  height: '100%',
  bg: 'background',
  overflowScrolling: true,
})``

export const ContentContainer = styled(Box).attrs({
  minHeight: ['75vh', 'auto', 'auto'],
  maxHeight: ['auto', 'auto', 'auto'],
  mb: [0],
  mt: [8, 0, 0],
})`
  position: relative;
  flex: 3;
  display: flex;
  align-items: center;
  justify-content: center;

  ${({ type }) => {
    if (type === 'Text') {
      return `
        margin-top: 0;
      `
    }
  }}
`

export const TextOutline = styled<{ border: boolean }>(Box).attrs({
  minHeight: '100%',
  height: ['100%', 'auto'],
  maxWidth: ['99vw', '55em'],
  px: 7,
  py: 6,
  mx: 'auto',
  overflow: 'hidden',
  position: 'relative',
})`
  ${constants.media.mobile`
    border-color: transparent;
  `}
`

export interface TextBoxContainerProps {
  onClick?: (e: any) => void
  border?: boolean
  color?: string
}

export const TextBoxContainer: React.FC<FullBlockLayoutProps &
  TextBoxContainerProps> = ({
  children,
  layout,
  onClick,
  border = true,
  color = null,
}) => {
  const borderColor =
    border && { DEFAULT: 'gray.semiLight', FULLSCREEN: 'gray.semiBold' }[layout]

  return (
    <Box height="100%" width="100%">
      <Box
        height={['auto', '100%']}
        minHeight={['75vh', 'auto']}
        width="100%"
        py={9}
        px={[0, 9]}
        overflowScrolling
      >
        <TextOutline
          width={{ DEFAULT: '100%', FULLSCREEN: '75%' }[layout]}
          bg={color || 'background'}
          border={border && '1px solid'}
          borderColor={borderColor}
          onClick={onClick}
        >
          {children}
        </TextOutline>
      </Box>
    </Box>
  )
}
