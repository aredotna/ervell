import React, { useCallback, useState } from 'react'
import { useQuery } from '@apollo/client'

import blockLightboxFoldQuery from 'v2/components/BlockLightbox/components/BlockLightboxMetadataFold/queries/blockLightboxFold'

import Count from 'v2/components/UI/Count'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import Header from 'v2/components/BlockLightbox/components/BlockLightboxMetadataPane/components/Header'
import BlockLightboxConnections from 'v2/components/BlockLightbox/components/BlockLightboxConnections'
import BlockLightboxComments from 'v2/components/BlockLightbox/components/BlockLightboxComments'
import { BlockLightbox as Block } from '__generated__/BlockLightbox'

import {
  BlockLightboxFold as BlockLightboxFoldType,
  BlockLightboxFoldVariables,
} from '__generated__/BlockLightboxFold'

interface BlockLightboxMetadataFoldProps {
  block: Block
}

export const BlockLightMetadataFold: React.FC<BlockLightboxMetadataFoldProps> = ({
  block: { id },
  block,
}) => {
  const { data, loading, error, fetchMore } = useQuery<
    BlockLightboxFoldType,
    BlockLightboxFoldVariables
  >(blockLightboxFoldQuery, { variables: { id: id.toString() } })
  const [state, setState] = useState({ per: 10, page: 1, loadingMore: false })

  const loadMore = useCallback(() => {
    const { page, per } = state

    setState(prevState => ({
      ...prevState,
      loadingMore: true,
    }))

    fetchMore({
      variables: { page: page + 1, per },
      updateQuery: (prevResult, { fetchMoreResult }) => ({
        block: {
          ...prevResult.block,
          ...fetchMoreResult.block,
          private_channels: [
            ...prevResult.block.private_channels,
            ...fetchMoreResult.block.private_channels,
          ],
          public_channels: [
            ...prevResult.block.public_channels,
            ...fetchMoreResult.block.public_channels,
          ],
        },
      }),
    }).then(({ errors }) => {
      if (errors) return

      setState(prevState => ({
        ...prevState,
        page: page + 1,
        loadingMore: false,
      }))
    })
  }, [fetchMore, state])

  if (
    error ||
    data?.block.__typename === 'Channel' ||
    block.__typename === 'Channel'
  ) {
    return <ErrorAlert>{error.message}</ErrorAlert>
  }

  const blockData = loading ? {} : data?.block
  const fullBlock = { ...block, ...blockData }
  const { loadingMore } = state

  return (
    <React.Fragment>
      <Header mt={8}>
        {data?.block.counts ? (
          <Count
            amount={
              data?.block.counts.private_channels +
              data?.block.counts.public_channels
            }
            label="Connection"
          />
        ) : (
          'Connections'
        )}
      </Header>

      <BlockLightboxConnections
        block={fullBlock}
        loading={loading}
        onLoadMore={loadMore()}
        loadingMore={loadingMore}
        mt={4}
      />

      {fullBlock.can.comment && (
        <React.Fragment>
          <Header mt={8}>
            {Object.prototype.hasOwnProperty.call(fullBlock, 'counts') ? (
              <Count amount={data?.block.counts.comments} label="Comment" />
            ) : (
              'Comment'
            )}
          </Header>

          <BlockLightboxComments block={fullBlock} loading={loading} mt={4} />
        </React.Fragment>
      )}
    </React.Fragment>
  )
}

export default BlockLightMetadataFold
