import React from 'react'
import styled from 'styled-components'

import { KonnectableChannelPreview_channel_preview_connectables } from '__generated__/KonnectableChannelPreview'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const Img = styled.img`
  width: 100%;
  height: 100%;
  object-fit: ${({ objectFit = 'cover' }: { objectFit: string }) => objectFit};
`

const Snippet = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  align-self: flex-start;

  &:after {
    content: '';
    display: block;
    position: absolute;
    bottom: 0;
    height: 4em;
    width: 100%;
    background: linear-gradient(
      ${props => props.theme.colors.utility.transparent} 0%,
      ${props => props.theme.colors.background} 100%
    );
  }
`

export enum ObjectFit {
  FILL = 'fill',
  CONTAIN = 'contain',
  COVER = 'cover',
  NONE = 'none',
  SCALE_DOWN = 'scale-down',
}

interface Props {
  connectable: KonnectableChannelPreview_channel_preview_connectables
  objectFit?: ObjectFit
}

export const KonnectableSimpleDisplay: React.FC<Props> = ({
  connectable,
  objectFit = ObjectFit.COVER,
}) => {
  switch (connectable.__typename) {
    case 'Text':
      return (
        <Snippet>
          <Text
            f={4}
            font="serif"
            textAlign="left"
            dangerouslySetInnerHTML={{ __html: connectable.preview_content }}
          />
        </Snippet>
      )
    case 'Image':
      return (
        <Img
          src={connectable.preview_image_url}
          alt="Preview"
          objectFit={objectFit}
        />
      )
    case 'Link':
      return (
        <Img
          src={connectable.preview_image_url}
          alt="Preview"
          objectFit={objectFit}
        />
      )
    case 'Embed':
      return (
        <Img
          src={connectable.preview_image_url}
          alt="Preview"
          objectFit={objectFit}
        />
      )
    case 'Attachment':
      return (
        <>
          {connectable.preview_image_url ? (
            <Img
              src={connectable.preview_image_url}
              alt="Preview"
              objectFit={objectFit}
            />
          ) : (
            <Box
              bg="gray.light"
              width="100%"
              height="100%"
              display="flex"
              alignItems="center"
              justifyContent="center"
            >
              <Text
                font="narrow"
                color="gray.medium"
                fontWeight="bold"
                f={8}
                textTransform="uppercase"
              >
                {connectable.file_extension}
              </Text>
            </Box>
          )}
        </>
      )
    case 'Channel':
      return (
        <Box
          width="100%"
          height="100%"
          textAlign="center"
          display="flex"
          alignItems="center"
          justifyContent="center"
          flexDirection="column"
          border="1px solid"
          borderColor={`channel.${connectable.visibility}`}
          px={4}
        >
          <Text
            pt={5}
            mb={3}
            f={3}
            color={`channel.${connectable.visibility}`}
            dangerouslySetInnerHTML={{ __html: connectable.preview_title }}
          />

          <Text f={0} color={`channel.${connectable.visibility}`}>
            {connectable.owner.name}
          </Text>
        </Box>
      )
  }
}
