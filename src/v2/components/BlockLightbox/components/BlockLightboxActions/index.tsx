import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import MuteButton from 'v2/components/MuteButton'
import BlockLightboxShare from 'v2/components/BlockLightbox/components/BlockLightboxShare'
import BlockLightboxChangeThumbnail from 'v2/components/BlockLightbox/components/BlockLightboxActions/components/BlockLightboxChangeThumbnail'

import { BlockLightbox as Block } from '__generated__/BlockLightbox'
import { LinkViewMode, OnLinkViewModeChange } from 'v2/components/BlockLightbox'

import { BlockLightboxSwitchViewMode } from './components/BlockLightboxSwitchViewMode'

const Container = styled(Box)`
  display: flex;
  justify-content: space-between;
`

const Inner = styled(Box)`
  flex: 1;

  ${props =>
    props.withBorder &&
    `
    border-right: 1px solid ${props.theme.colors.gray.light};
    padding-right: ${props.theme.space[6]};
    margin-right: ${props.theme.space[6]};
  `}

  > a {
    display: block;
  }
`

const Mute = styled(MuteButton)`
  cursor: pointer;
`

interface BlockLightboxActionsProps {
  block: Block
  linkViewMode: LinkViewMode
  onLinkViewModeChange: OnLinkViewModeChange
}

const BlockLightboxActions: React.FC<BlockLightboxActionsProps> = ({
  block,
  linkViewMode,
  onLinkViewModeChange,
}) => {
  if (block.__typename === 'Channel') {
    return null
  }

  const imageUpdatedAtTimeStamp =
    (block.__typename === 'Link' || block.__typename === 'Attachment') &&
    parseInt(block.image_updated_at_unix_time)

  const showImageEditedDate =
    imageUpdatedAtTimeStamp &&
    imageUpdatedAtTimeStamp - parseInt(block.created_at_unix_time) > 60

  const imageUpdatedAt =
    (block.__typename === 'Link' || block.__typename === 'Attachment') &&
    block.image_updated_at

  return (
    <Container>
      {block.__typename === 'Link' && (
        <Inner withBorder>
          <BlockLightboxSwitchViewMode
            linkViewMode={linkViewMode}
            onLinkViewModeChange={onLinkViewModeChange}
          />
        </Inner>
      )}

      <Inner>
        {!!showImageEditedDate && (
          <Text color="gray.regular" fontSize={1}>
            Cover image edited on {imageUpdatedAt}
          </Text>
        )}

        {(block.can.potentially_edit_thumbnail || block.can.edit_thumbnail) && (
          <>
            <BlockLightboxChangeThumbnail block={block} />
          </>
        )}

        <BlockLightboxShare block={block} />

        {(block.__typename === 'Image' || block.__typename === 'Text') &&
          block.find_original_url && (
            <a
              href={block.find_original_url}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Find original
            </a>
          )}
        {block.can.mute && <Mute id={block.id} type="BLOCK" />}
      </Inner>
    </Container>
  )
}

export default BlockLightboxActions
