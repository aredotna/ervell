import React from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'

import Title from 'v2/components/UI/Head/components/Title'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import Constrain from 'v2/components/UI/Constrain'
import { AboutTopBarLayout } from 'v2/components/UI/Layouts/AboutTopBarLayout'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

import { BlogPreview } from 'v2/pages/blog/BlogIndex/components/BlogPreview'

import BLOG_INDEX_QUERY from 'v2/pages/blog/BlogIndex/contentfulQueries/BlogIndex'
import { NewsletterSignup } from './components/NewsletterSignup'

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
  max-width: 450px;
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

      <AboutTopBarLayout>
        <Constrain>
          <TopContainer>
            <Headline>Are.na Editorial</Headline>
            <Description>
              Essays, interviews, and other forms of writing from the Are.na
              community.
            </Description>

            <NewsletterSignup />
          </TopContainer>

          <BlogPostContainer>
            {data &&
              data.blogPostCollection.items.map(post => {
                return <BlogPreview key={post.id} post={post} />
              })}
          </BlogPostContainer>
        </Constrain>
      </AboutTopBarLayout>
    </ErrorBoundary>
  )
}
