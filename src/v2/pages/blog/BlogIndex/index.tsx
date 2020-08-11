import React from 'react'
import { useQuery } from 'react-apollo'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import TopBarLayout from 'v2/components/UI/Layouts/TopBarLayout'
import Constrain from 'v2/components/UI/Constrain'

import Title from 'v2/components/UI/Head/components/Title'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'

import BLOG_INDEX_QUERY from 'v2/pages/blog/BlogIndex/queries/BlogIndex'
import Box from 'v2/components/UI/Box'
import { BlogPreview } from 'v2/pages/blog/BlogIndex/components/BlogPreview'

const Headline = styled(Text).attrs({
  fontSize: 8,
  lineHeight: 1,
  align: 'center',
  mt: 9,
})``

const TopContainer = styled(Box).attrs({
  mt: 10,
  mb: 9,
  mx: 'auto',
})`
  max-width: 470px;
`

const Description = styled(Text).attrs({
  fontSize: 4,
  lineHeight: 2,
  align: 'center',
  my: 7,
  px: 5,
})``

const BlogPostContainer = styled(Box)`
  max-width: 60em;
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto 4em;
  justify-content: center;
`

export const BlogIndex: React.FC = () => {
  const { data } = useQuery(BLOG_INDEX_QUERY, {
    context: { clientName: 'contentful' },
  })

  return (
    <ErrorBoundary>
      <Title>Blog</Title>

      <TopBarLayout>
        <Constrain>
          <TopContainer>
            <Headline>Are.na Blog</Headline>
            <Description>
              Learn about how people use Are.na to do work and pursue personal
              projects through case studies, interviews, and highlights.
            </Description>
          </TopContainer>

          <BlogPostContainer>
            {data &&
              data.blogPostCollection.items.map(post => {
                return <BlogPreview key={post.id} post={post} />
              })}
          </BlogPostContainer>
        </Constrain>
      </TopBarLayout>
    </ErrorBoundary>
  )
}
