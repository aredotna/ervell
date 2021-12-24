import React from 'react'
import styled from 'styled-components'
import { useLocation } from 'react-router'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import MuteButton from 'v2/components/MuteButton'
import FullBlockShare from 'v2/components/FullBlock/components/FullBlockShare'
import FullBlockChangeThumbnail from 'v2/components/FullBlock/components/FullBlockActions/components/FullBlockChangeThumbnail'

import { FullBlock as Block } from '__generated__/FullBlock'
import { LinkViewMode, OnLinkViewModeChange } from 'v2/components/FullBlock'

import { FullBlockSwitchViewMode } from './components/FullBlockSwitchViewMode'
import { Link } from 'react-router-dom'

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

interface FullBlockActionsProps {
  block: Block
  linkViewMode: LinkViewMode
  onLinkViewModeChange: OnLinkViewModeChange
  hideLinkMode?: boolean
  showOpenFullBlock?: boolean
}

const FullBlockActions: React.FC<FullBlockActionsProps> = ({
  block,
  linkViewMode,
  onLinkViewModeChange,
  hideLinkMode = false,
  showOpenFullBlock = false,
}) => {
  const location = useLocation()
  if (block?.__typename === 'Channel') {
    return null
  }

  const imageUpdatedAtTimeStamp =
    (block?.__typename === 'Link' || block?.__typename === 'Attachment') &&
    parseInt(block?.image_updated_at_unix_time)

  const showImageEditedDate =
    imageUpdatedAtTimeStamp &&
    imageUpdatedAtTimeStamp - parseInt(block?.created_at_unix_time) > 60

  const imageUpdatedAt =
    (block?.__typename === 'Link' || block?.__typename === 'Attachment') &&
    block?.image_updated_at

  const toParams = location && {
    pathname: block?.href,
    state: {
      background: JSON.stringify(location),
      context: [],
    },
  }

  return (
    <Container>
      {block?.__typename === 'Link' && !hideLinkMode && (
        <Inner withBorder>
          <FullBlockSwitchViewMode
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

        {(block?.can.potentially_edit_thumbnail ||
          block?.can.edit_thumbnail) && (
          <>
            <FullBlockChangeThumbnail block={block} />
          </>
        )}

        {showOpenFullBlock && block?.href && (
          <Link to={toParams}>Open in lightbox</Link>
        )}

        <FullBlockShare connectable={block} />

        {(block?.__typename === 'Image' || block?.__typename === 'Text') &&
          block?.find_original_url && (
            <a
              href={block?.find_original_url}
              rel="nofollow noopener noreferrer"
              target="_blank"
            >
              Find original
            </a>
          )}

        {block?.__typename === 'Image' && (
          <a
            download={`block-${block?.id}.jpg`}
            href={block?.downloadable_image}
            rel="nofollow noopener noreferrer"
          >
            Download
          </a>
        )}

        {block?.can.mute && <Mute id={block?.id} type="BLOCK" />}
      </Inner>
    </Container>
  )
}

export default FullBlockActions
