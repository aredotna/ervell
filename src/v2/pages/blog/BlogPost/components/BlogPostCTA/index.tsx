import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { GenericButtonLink } from 'v2/components/UI/GenericButton'

const Container = styled(Box).attrs({ py: 8, my: 8 })`
  border-top: 1px solid ${({ theme }) => theme.colors.gray.light};
  display: flex;
  justify-content: center;
`

const Inner = styled(Box)`
  max-width: 500px;
  text-align: center;
`

export const BlogPostCTA: React.FC = () => {
  return (
    <Container>
      <Inner>
        <Text f={7}>Are.na Blog</Text>
        <Text f={4} my={8}>
          Learn about how people use Are.na to do work and pursue personal
          projects through case studies, interviews, and highlights.
        </Text>
        <GenericButtonLink f={5} href="/blog">
          See More
        </GenericButtonLink>
      </Inner>
    </Container>
  )
}
