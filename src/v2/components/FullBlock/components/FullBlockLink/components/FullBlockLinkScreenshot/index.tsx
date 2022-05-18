import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'

import { FullBlockLinkProps } from 'v2/components/FullBlock/components/FullBlockLink'

const Screenshot = styled(Box)``

const Image = styled(Box)`
  position: relative;
  background-size: cover;
  background-position: top center;
  background-image: url(${props => props.backgroundImage});

  &:after {
    content: '';
    display: block;
    position: absolute;
    right: 0;
    bottom: 0;
    left: 0;
    height: 6em;
    background: linear-gradient(
      ${props => props.theme.colors.utility.transparent} 0%,
      rgba(0, 0, 0, 0.125) 100%
    );
  }
`

const Url = styled(Text).attrs({
  f: 2,
  font: 'mono',
  color: 'gray.semiBold',
  overflowEllipsis: true,
  breakWord: true,
})`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`

const Container = styled(Box)`
  overflow: hidden;
  max-width: 60vw;
`

export const FullBlockLinkScreenshot: React.FC<FullBlockLinkProps> = ({
  block,
}) => {
  return (
    <Box
      px={6}
      py={7}
      width="100%"
      height="100%"
      display="flex"
      alignItems="center"
      justifyContent="center"
      position="relative"
    >
      <Container
        display="flex"
        flexDirection="column"
        height={['95vh', '95%']}
        width="90%"
        border="1px solid"
        borderColor="gray.light"
        borderRadius="0.25em"
        position="relative"
      >
        <a
          href={block.source_url}
          rel="noopener nofollow noreferrer"
          target="_blank"
        >
          <Box
            px={6}
            py={4}
            display="flex"
            borderBottom="1px solid"
            borderColor="gray.light"
            bg="background"
          >
            <Icons
              name="Link"
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

        <Screenshot bg="middleGray" flex="1" width="100%" position="relative">
          <a
            href={block.source_url}
            rel="noopener nofollow noreferrer"
            target="_blank"
          >
            <Image
              width="100%"
              height="100%"
              backgroundImage={block.image_url}
            />
          </a>
        </Screenshot>
      </Container>
    </Box>
  )
}
