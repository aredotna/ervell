import React from 'react'
import { useQuery } from '@apollo/client'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { truncate } from 'v2/components/UI/Truncate'

import BlockLightboxActions from 'v2/components/BlockLightbox/components/BlockLightboxActions'
import Header from 'v2/components/BlockLightbox/components/BlockLightboxMetadataPane/components/Header'

import { ChannelTableContentsSet_channel_blokks } from '__generated__/ChannelTableContentsSet'
import EXPANDED_BLOCK_METADATA_QUERY from './queries/expandedBlockMetadata'
import {
  ExpandedBlockMetadata as ExpandedBlockMetadataType,
  ExpandedBlockMetadataVariables,
} from '__generated__/ExpandedBlockMetadata'
import { BlockLightbox } from '__generated__/BlockLightbox'

interface ExpandedBlockMetadataProps {
  block: ChannelTableContentsSet_channel_blokks
}

export const ExpandedBlockMetadata: React.FC<ExpandedBlockMetadataProps> = ({
  block: { id, title },
}) => {
  const { data } = useQuery<
    ExpandedBlockMetadataType,
    ExpandedBlockMetadataVariables
  >(EXPANDED_BLOCK_METADATA_QUERY, { variables: { id: id.toString() } })

  const { block } = data || {}

  return (
    <Box height="100%" p={3}>
      <Text mb={5} f={5} hyphenate color="gray.block">
        {!block?.title ? (
          <Text color="gray.medium">—</Text>
        ) : (
          <span dangerouslySetInnerHTML={{ __html: title || block.title }} />
        )}
      </Text>

      {block?.description && (
        <Text
          f={3}
          lineHeight={2}
          color="gray.block"
          dangerouslySetInnerHTML={{ __html: block?.description }}
          breakWord
          boldLinks
          hoverLinks={{ color: 'gray.bold' }}
        />
      )}

      <Header mt={4} mb={5}></Header>

      <Box mb={8}>
        <Text f={1} lineHeight={2} color="gray.medium">
          <time
            dateTime={block?.created_at_timestamp}
            title={block?.created_at_timestamp}
          >
            Added {block?.created_at} by{' '}
          </time>

          <a href={block?.user.href}>
            <strong>{block?.user.name}</strong>
          </a>

          {block?.created_at !== block?.updated_at && (
            <React.Fragment>
              <br />

              <time
                dateTime={block?.updated_at_timestamp}
                title={block?.updated_at_timestamp}
              >
                Last updated {block.updated_at}
              </time>
            </React.Fragment>
          )}

          {block?.source && block?.source.url && (
            <>
              <br />
              <a
                href={block.source.url}
                rel="nofollow noopener noreferrer"
                target="_blank"
                dangerouslySetInnerHTML={{
                  __html: block.source.title
                    ? `Source: <strong>${truncate(
                        block.source.title,
                        40
                      )}</strong>`
                    : 'Source',
                }}
              />
            </>
          )}
        </Text>
        {block?.__typename !== 'PendingBlock' && (
          <>
            <Header mt={4} mb={4}>
              Actions
            </Header>
            <Text my={6} f={1} fontWeight="bold" lineHeight={2}>
              <BlockLightboxActions
                block={block as BlockLightbox}
                linkViewMode={'screenshot'}
                onLinkViewModeChange={() => null}
                hideLinkMode
              />
            </Text>
          </>
        )}
      </Box>
    </Box>
  )
}
