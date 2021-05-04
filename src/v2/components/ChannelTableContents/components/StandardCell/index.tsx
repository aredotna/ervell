import React from 'react'
import styled from 'styled-components'
import Text from 'v2/components/UI/Text'

const Inner = styled.div`
  padding: ${x => x.theme.space[3]};
  max-width: 200px;
`

export const StandardCell = ({ value }) => {
  return (
    <Inner>
      <Text f={1} overflowEllipsis>
        {value}
      </Text>
    </Inner>
  )
}
