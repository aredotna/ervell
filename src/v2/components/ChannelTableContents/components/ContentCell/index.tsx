import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import { SansSerifText } from 'v2/components/UI/SansSerifText'

import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'

const TextContainer = styled(Box).attrs({
  pt: 4,
  px: 5,
})`
  position: relative;
  width: 100%;
  max-height: ${x => x.theme.space[12]};
  overflow: hidden;
  text-align: left;

  // If text is long: overflow with a small gradient fade out
  ${props =>
    props.length > 500 &&
    `
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 3em;
      background: linear-gradient(${props.theme.colors.utility.transparent} 0%, ${props.theme.colors.background} 100%);
    }
  `}
`

const Text = styled(SansSerifText).attrs({ isSmall: true })`
  font-size: ${x => x.theme.fontSizesIndexed.sm};
  max-width: ${x => x.theme.space[11]};
`

const Img = styled.img`
  width: ${x => x.theme.space[7]};
  height: ${x => x.theme.space[7]};
`

export const ContentCell = ({
  value: content,
}: {
  value: ChannelTableContentsSet_channel_blokks
}) => {
  switch (content.__typename) {
    case 'Attachment':
    case 'Link':
    case 'Image':
      return <Img src={content.image_url} />
    case 'Text':
      return (
        <TextContainer length={content.content.length}>
          <Text dangerouslySetInnerHTML={{ __html: content.content }} />
        </TextContainer>
      )
    default:
      return null
  }
}
