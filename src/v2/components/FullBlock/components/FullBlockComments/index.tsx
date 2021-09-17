import React from 'react'
import { useQuery } from '@apollo/client'

import Box from 'v2/components/UI/Box'
import FullBlockComment from 'v2/components/FullBlock/components/FullBlockComment'
import FullBlockAddComment from 'v2/components/FullBlock/components/FullBlockAddComment'

import fullBlockCommentsQuery from 'v2/components/FullBlock/components/FullBlockComments/queries/fullBlockComments'

import { FullBlockComments as FullBlockCommentsType } from '__generated__/FullBlockComments'
import {
  FullBlockCommentsQuery,
  FullBlockCommentsQueryVariables,
} from '__generated__/FullBlockCommentsQuery'

interface FullBlockCommentsProps {
  block: FullBlockCommentsType
}

export const FullBlockComments: React.FC<FullBlockCommentsProps> = ({
  block,
  ...rest
}) => {
  return (
    <Box {...rest}>
      {block.__typename !== 'Channel' &&
        block.comments.map(comment => (
          <FullBlockComment mb={6} key={comment.id} comment={comment} />
        ))}
      <FullBlockAddComment id={block.id} />
    </Box>
  )
}

interface FullBlockCommentsTypeProps {
  id: string
}

export const FullBlockCommentsWithQuery: React.FC<FullBlockCommentsTypeProps> = ({
  id,
}) => {
  const { data, loading } = useQuery<
    FullBlockCommentsQuery,
    FullBlockCommentsQueryVariables
  >(fullBlockCommentsQuery, { variables: { id } })

  if (loading) return null

  return <FullBlockComments block={data.block} />
}
