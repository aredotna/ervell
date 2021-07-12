import React from 'react'
import styled from 'styled-components'
import { SansSerifText } from 'v2/components/UI/SansSerifText'

import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'

const TextContainer = styled.div`
  padding: ${x => x.theme.space[4]};
  height: 100%;
`

const ImageContainer = styled.div`
  height: 100%;
  display: flex;
  justify-content: center;
  align-items: center;
`

const Image = styled.img`
  display: block;
  max-width: 100%;
  max-height: 100%;
  object-fit: scale-down;
`

interface ExpandedBlockRowContentsProps {
  block: ChannelTableContentsSet_channel_blokks
}

export const ExpandedBlockRowContents: React.FC<ExpandedBlockRowContentsProps> = ({
  block,
}) => {
  if (block.__typename === 'Text') {
    return (
      <TextContainer>
        <SansSerifText
          color={'gray.block'}
          isSmall
          dangerouslySetInnerHTML={{ __html: block.html }}
        />
      </TextContainer>
    )
  }

  if (block.__typename === 'Image') {
    return (
      <ImageContainer>
        <Image src={block.image_url} alt={block.title} title={block.title} />
      </ImageContainer>
    )
  }

  return null
}
