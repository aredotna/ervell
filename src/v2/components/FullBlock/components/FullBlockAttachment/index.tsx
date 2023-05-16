import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Link from 'v2/components/UI/Link'
import Text from 'v2/components/UI/Text'
import Badge from 'v2/components/UI/Badge'

import { FullBlockAttachment_Attachment } from '__generated__/FullBlockAttachment'
import { unescape } from 'lodash'

const Player = styled.audio`
  &::-webkit-media-controls-panel {
    background-color: ${props => props.theme.colors.gray.light};
  }
`

const SvgPreview = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: scale-down;
  margin: auto;
`

const VideoContainer = styled(Box).attrs({
  p: 6,
})`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const VideoPlayer = styled.video`
  display: block;
  max-width: 95%;
  max-height: 95%;
  object-fit: scale-down;
  margin: auto;
`

interface FullBlockAttachmentProps {
  block: FullBlockAttachment_Attachment
  layout?: 'DEFAULT' | 'FULLSCREEN'
}

export const FullBlockAttachment: React.FC<FullBlockAttachmentProps> = ({
  block,
  layout = 'DEFAULT',
}) => {
  console.log({ block })

  return (
    <Box
      display="flex"
      width="100%"
      height="100%"
      mt={['85px', 0, 0]}
      alignItems="center"
      justifyContent="center"
      textAlign="center"
      flexDirection="column"
      bg={{ DEFAULT: 'gray.hint', FULLSCREEN: 'gray.bold' }[layout]}
    >
      {block.file_content_type === 'application/pdf' && (
        <Box flex="1" width="100%" maxHeight="100%">
          <iframe
            src={block.file_url}
            width="100%"
            height="100%"
            title={block.title}
          />
        </Box>
      )}

      {block.file_content_type === 'image/svg+xml' && (
        <Box display="flex" flex="1">
          <SvgPreview src={block.file_url} alt={block.title} />
        </Box>
      )}

      {block.file_content_type === 'video/mp4' && (
        <VideoContainer>
          <VideoPlayer src={block.file_url} controls title={block.title} />
        </VideoContainer>
      )}

      {block.file_content_type === 'audio/mpeg' && (
        <Box my={3}>
          <Player controls>
            <source src={block.file_url} type="audio/mpeg" />
          </Player>
        </Box>
      )}

      <Link
        display="block"
        p={6}
        href={block.file_url}
        rel="nofollow noopener"
        target="_blank"
        download
      >
        <Text
          f={3}
          fontWeight="bold"
          lineHeight={2}
          color={{ DEFAULT: 'gray.base', FULLSCREEN: 'gray.hint' }[layout]}
        >
          <span>{unescape(`Download ${block.title}`)}</span>
        </Text>

        <Box my={3} display="flex" alignItems="center" justifyContent="center">
          <Badge mr={4} f={2} color="gray.medium">
            {block.file_extension}
          </Badge>

          <Text f={3} fontWeight="bold" color="gray.medium">
            {block.file_size}
          </Text>
        </Box>
      </Link>
    </Box>
  )
}

export default FullBlockAttachment
