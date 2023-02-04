import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'
import constants from 'v2/styles/constants'

import { FullBlockLayoutProps } from 'v2/components/FullBlockLayout'

import { SansSerifText } from 'v2/components/UI/SansSerifText'
import { FullBlockLinkQuery_block_Link as Block } from '__generated__/FullBlockLinkQuery'

const Url = styled(Text).attrs({
  f: [0, 1],
  font: 'mono',
  color: 'gray.semiBold',
  overflowEllipsis: true,
  breakWord: true,
})`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

interface FullBlockTextProps {
  layout: 'DEFAULT' | 'FULLSCREEN'
  block: Block
}

export const Outline = styled<{ border: boolean }>(Box).attrs({
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

const SourceContainer = styled(Box).attrs({
  maxWidth: ['99vw', '55em'],
  mx: 'auto',
  mb: 6,
})``

const TweetTextContainer: React.FC<FullBlockLayoutProps &
  FullBlockTextProps> = ({ block, layout, children }) => {
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
        <SourceContainer>
          <a
            href={block.source_url}
            rel="noopener nofollow noreferrer"
            target="_blank"
          >
            <Box
              px={4}
              py={3}
              display="flex"
              border="1px solid"
              borderColor="gray.light"
              borderRadius="0.25em"
              bg="background"
            >
              <Icons
                name="Twitter"
                size="1rem"
                color="gray.base"
                mr={5}
                flexShrink={0}
              />

              <Url>
                <u>{block.source_url}</u>
              </Url>
            </Box>
          </a>
        </SourceContainer>
        <Outline
          width={{ DEFAULT: '100%', FULLSCREEN: '75%' }[layout]}
          bg={'gray.light'}
          border={'1px solid'}
          borderColor={'gray.semiLight'}
        >
          {children}
        </Outline>
      </Box>
    </Box>
  )
}

export const FullBlockLinkTweet: React.FC<FullBlockTextProps> = ({
  layout,
  block,
}) => {
  return (
    <TweetTextContainer block={block} layout={layout}>
      <SansSerifText
        color={{ DEFAULT: 'gray.block', FULLSCREEN: 'gray.block' }[layout]}
        dangerouslySetInnerHTML={{ __html: block.content }}
      />
    </TweetTextContainer>
  )
}
