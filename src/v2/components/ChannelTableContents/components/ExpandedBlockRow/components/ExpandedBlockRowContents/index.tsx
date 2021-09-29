import { useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'
import { FullBlockLinkScreenshot } from 'v2/components/FullBlock/components/FullBlockLink/components/FullBlockLinkScreenshot'
import { SansSerifText } from 'v2/components/UI/SansSerifText'

import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import {
  ExpandedBlockRowContents as ExpandedBlockRowContentsType,
  ExpandedBlockRowContentsVariables,
} from '__generated__/ExpandedBlockRowContents'
import expandedBlockRowContents from './queries/expandedBlockRowContents'

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
  const { data, error } = useQuery<
    ExpandedBlockRowContentsType,
    ExpandedBlockRowContentsVariables
  >(expandedBlockRowContents, { variables: { id: block.id.toString() } })

  console.log('data?.block', data?.block, { error })

  if (block?.__typename === 'Text') {
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

  if (data?.block.__typename === 'Link') {
    console.log({ block: data.block })
    return (
      <FullBlockLinkScreenshot
        linkViewMode={'screenshot'}
        block={data?.block}
        layout="DEFAULT"
      />
    )
  }

  if (block?.__typename === 'Image') {
    return (
      <ImageContainer>
        <Image src={block.image_url} alt={block.title} title={block.title} />
      </ImageContainer>
    )
  }

  return null
}
