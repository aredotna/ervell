import React from 'react'
import styled from 'styled-components'

import { KonnectableChannelPreviewConnectable as KonnectableChannelPreviewConnectableData } from '__generated__/KonnectableChannelPreviewConnectable'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const Img = styled.img`
  width: 100%;
  height: 100%;
  background-color: ${props => props.theme.colors.gray.hint};
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
    height: 3em;
    width: 100%;
    background: linear-gradient(
      ${props => props.theme.colors.utility.transparent} 0%,
      white 50%
    );
  }
`

interface Props {
  connectable: KonnectableChannelPreviewConnectableData
}

export const KonnectableSimpleDisplay: React.FC<Props> = ({ connectable }) => {
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
      return <Img src={connectable.preview_image_url} alt="Preview" />
    case 'Link':
      return <Img src={connectable.preview_image_url} alt="Preview" />
    case 'Embed':
      return <Img src={connectable.preview_image_url} alt="Preview" />
    case 'Attachment':
      return (
        <>
          {connectable.preview_image_url ? (
            <Img src={connectable.preview_image_url} alt="Preview" />
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
        >
          <Text
            pt={5}
            mb={3}
            f={5}
            color={`channel.${connectable.visibility}`}
            dangerouslySetInnerHTML={{ __html: connectable.preview_title }}
          />

          <Text f={1} color={`channel.${connectable.visibility}`}>
            {connectable.owner.name}
          </Text>
        </Box>
      )
  }
}
