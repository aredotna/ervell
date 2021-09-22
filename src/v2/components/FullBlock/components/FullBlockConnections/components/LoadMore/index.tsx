import React, { useState } from 'react'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { EmptyCompactChannel } from 'v2/components/CompactChannel'

interface LoadMoreProps {
  onLoadMore: () => void
}

const LoadMore: React.FC<LoadMoreProps> = ({ onLoadMore }) => {
  const [hovered, setHovered] = useState<boolean>(false)
  const textColor = hovered ? 'gray.bold' : 'gray.semiBold'

  return (
    <EmptyCompactChannel
      onClick={onLoadMore}
      my={3}
      color="utility.transparent"
      onMouseOver={() => setHovered(true)}
      onMouseOut={() => setHovered(false)}
    >
      <Box
        width="100%"
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        {/* HACK: f={4} non-breaking spaces allow us to match the height perfectly */}
        <Text f={4}>&nbsp;</Text>

        <Text
          f={1}
          color={textColor}
          textAlign="center"
          textTransform="uppercase"
        >
          Load more
        </Text>

        <Text f={4}>&nbsp;</Text>
      </Box>
    </EmptyCompactChannel>
  )
}

export { LoadMore }
