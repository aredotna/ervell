import { useQuery } from '@apollo/client'
import React from 'react'
import styled from 'styled-components'

import { FullBlockAttachment } from 'v2/components/FullBlock/components/FullBlockAttachment'
import FullBlockEmbed from 'v2/components/FullBlock/components/FullBlockEmbed'
import { FullBlockLinkScreenshot } from 'v2/components/FullBlock/components/FullBlockLink/components/FullBlockLinkScreenshot'
import { SansSerifText } from 'v2/components/UI/SansSerifText'
import Box from 'v2/components/UI/Box'

import isHexColor from 'v2/util/isHexColor'
import expandedBlockRowContents from './queries/expandedBlockRowContents'

import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import {
  ExpandedBlockRowContents as ExpandedBlockRowContentsType,
  ExpandedBlockRowContentsVariables,
} from '__generated__/ExpandedBlockRowContents'
import { ProfileTableContents_user_contents } from '__generated__/ProfileTableContents'
import { unescape } from 'lodash'

const TextContainer = styled(Box)`
  padding: ${x => x.theme.space[4]};
  max-height: 450px;
  height: 100%;
  overflow-x: scroll;
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
  block:
    | ChannelTableContentsSet_channel_blokks
    | ProfileTableContents_user_contents
}

export const ExpandedBlockRowContents: React.FC<ExpandedBlockRowContentsProps> = ({
  block,
}) => {
  const { data } = useQuery<
    ExpandedBlockRowContentsType,
    ExpandedBlockRowContentsVariables
  >(expandedBlockRowContents, { variables: { id: block.id.toString() } })

  if (block?.__typename === 'Text') {
    const isColor = isHexColor(block.content)

    return (
      <TextContainer bg={isColor ? block.content : undefined}>
        {!isColor && (
          <SansSerifText
            color={'gray.block'}
            isSmall
            dangerouslySetInnerHTML={{ __html: block.html }}
          />
        )}
      </TextContainer>
    )
  }

  if (data?.block.__typename === 'Attachment') {
    return (
      <TextContainer>
        <FullBlockAttachment block={data.block} layout="DEFAULT" />
      </TextContainer>
    )
  }

  if (data?.block.__typename === 'Link') {
    return (
      <FullBlockLinkScreenshot
        linkViewMode={'screenshot'}
        block={data?.block}
        layout="DEFAULT"
      />
    )
  }

  if (data?.block.__typename === 'Embed') {
    return <FullBlockEmbed block={data?.block} />
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
