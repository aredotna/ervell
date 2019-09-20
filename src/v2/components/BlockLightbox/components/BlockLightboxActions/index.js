import React from 'react'
import styled from 'styled-components'
import { propType } from 'graphql-anywhere'

import { truncate } from 'v2/components/UI/Truncate'

import blockLightboxActionsFragment from 'v2/components/BlockLightbox/components/BlockLightboxActions/fragments/blockLightboxActions'

import Box from 'v2/components/UI/Box'
import MuteButton from 'v2/components/MuteButton'
import BlockLightboxShare from 'v2/components/BlockLightbox/components/BlockLightboxShare'
import BlockLightboxChangeThumbnail from 'v2/components/BlockLightbox/components/BlockLightboxActions/components/BlockLightboxChangeThumbnail'

const Container = styled(Box)`
  > a {
    display: block;
  }
`

const Mute = styled(MuteButton)`
  cursor: pointer;
`

const BlockLightboxActions = ({ block }) => (
  <Container>
    <BlockLightboxShare block={block} />

    {block.source && (
      <a
        href={block.source.url}
        rel="nofollow noopener noreferrer"
        target="_blank"
        dangerouslySetInnerHTML={{
          __html: block.source.title
            ? `Source: ${truncate(block.source.title, 40)}`
            : 'Source',
        }}
      />
    )}

    {block.find_original_url && (
      <a
        href={block.find_original_url}
        rel="nofollow noopener noreferrer"
        target="_blank"
      >
        Find original
      </a>
    )}

    {block.can.mute && <Mute id={block.id} type="BLOCK" />}

    {(block.can.potentially_edit_thumbnail || block.can.edit_thumbnail) && (
      <BlockLightboxChangeThumbnail block={block} />
    )}
  </Container>
)

BlockLightboxActions.propTypes = {
  block: propType(blockLightboxActionsFragment).isRequired,
}

export default BlockLightboxActions
