import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import fullBlockFoldQuery from 'v2/components/FullBlock/components/FullBlockMetadataFold/queries/fullBlockFold'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Count from 'v2/components/UI/Count'
import ErrorAlert from 'v2/components/UI/ErrorAlert'
import { FullBlockConnections } from 'v2/components/FullBlock/components/FullBlockConnections'
import { FullBlockCommentsWithQuery } from 'v2/components/FullBlock/components/FullBlockComments'
import { FullBlock as Block } from '__generated__/FullBlock'

import {
  FullBlockFold as FullBlockFoldType,
  FullBlockFoldVariables,
  FullBlockFold_block,
} from '__generated__/FullBlockFold'

interface FullBlockMetadataFoldProps {
  block: Block | FullBlockFold_block
}

const Header = ({
  children: title,
  selected = false,
  action = null,
  ...rest
}) => (
  <Box
    mt={6}
    mb={3}
    pb={3}
    borderBottom="1px solid"
    borderColor={selected ? 'gray.bold' : 'gray.light'}
    flex={1}
    justifyContent="space-between"
    style={{ cursor: 'pointer' }}
    {...rest}
  >
    <Text f={2} color={selected ? 'gray.bold' : 'gray.medium'} align="center">
      {title}
    </Text>
    {action}
  </Box>
)

export const FullBlockMetadataFold: React.FC<FullBlockMetadataFoldProps> = ({
  block: { id },
  block,
}) => {
  const { data, loading, error } = useQuery<
    FullBlockFoldType,
    FullBlockFoldVariables
  >(fullBlockFoldQuery, { variables: { id: id.toString() } })

  const [selectedTab, setSelectedTab] = useState<'connections' | 'comments'>(
    'connections'
  )

  if (
    error ||
    data?.block.__typename === 'Channel' ||
    block.__typename === 'Channel'
  ) {
    return <ErrorAlert>{error.message}</ErrorAlert>
  }

  const blockData = loading ? {} : data?.block
  const fullBlock = { ...block, ...blockData }

  return (
    <Box>
      <Box display="flex" flexDirection="row" width="100%">
        <Header
          selected={selectedTab === 'connections'}
          onClick={() => setSelectedTab('connections')}
        >
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
        {fullBlock.can.comment && (
          <>
            <Header
              selected={selectedTab === 'comments'}
              onClick={() => setSelectedTab('comments')}
            >
              {Object.prototype.hasOwnProperty.call(fullBlock, 'counts') ? (
                <Count amount={data?.block.counts.comments} label="Comment" />
              ) : (
                'Comment'
              )}
            </Header>
          </>
        )}
      </Box>

      <Box
        mt={3}
        display="flex"
        flexDirection="column"
        justifyContent="flex-start"
      >
        {selectedTab === 'connections' && (
          <FullBlockConnections id={block.id.toString()} />
        )}
        {selectedTab === 'comments' && (
          <FullBlockCommentsWithQuery id={block.id.toString()} />
        )}
      </Box>
    </Box>
  )
}

interface FullBlockMetadataFoldWithQueryProps {
  id: string
}

export const FullBlockMetadataFoldWithQuery: React.FC<FullBlockMetadataFoldWithQueryProps> = ({
  id,
}) => {
  const { data } = useQuery<FullBlockFoldType, FullBlockFoldVariables>(
    fullBlockFoldQuery,
    { variables: { id }, ssr: false }
  )

  if (!data) return null

  return <FullBlockMetadataFold block={data.block} />
}

export default FullBlockMetadataFold
