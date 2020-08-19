import React from 'react'
import { useQuery } from 'react-apollo'
import styled from 'styled-components'
import moment from 'moment'

import Constrain from 'v2/components/UI/Constrain'

import Title from 'v2/components/UI/Head/components/Title'
import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import { BlogPostContent } from './components/BlogPostContent'
import { BlogPostAuthor } from './components/BlogPostAuthor'
import { BlogPostCTA } from './components/BlogPostCTA'
import { LoggedOutFooter } from 'v2/components/LoggedOutFooter'
import { AboutTopBarLayout } from 'v2/components/UI/Layouts/AboutTopBarLayout'

import BLOG_POST_CONTENT_QUERY from 'v2/pages/blog/BlogPost/queries/BlogPostBySlug'

interface BlogPostProps {
  slug: string
}

const Container = styled(Box).attrs({ mt: 10, mx: 'auto' })`
  max-width: 670px;
`

const PostTitle = styled(Text).attrs({
  f: 7,
  my: 3,
})`
  font-weight: bold;
`

const Category = styled(Text).attrs({
  f: 1,
  fontWeight: 'bold',
})`
  text-transform: uppercase;
`

const Metadata = styled(Box).attrs({ my: 7 })``

const Meta = styled(Text).attrs({
  f: 4,
})``

export const BlogPost: React.FC<BlogPostProps> = ({ slug }) => {
  const { data } = useQuery(BLOG_POST_CONTENT_QUERY, {
    context: { clientName: 'contentful' },
    variables: { slug },
  })

  const post = data ? data?.blogPostCollection?.items[0] : null

  if (!post) {
    return null
  }

  return (
    <ErrorBoundary>
      <Title>{post ? post.title : 'Blog'}</Title>

      <AboutTopBarLayout>
        <Constrain>
          <Container>
            <Category>{post.category}</Category>
            <PostTitle>{post.title}</PostTitle>

            <Metadata>
              <Meta>{moment(post.displayDate).format('LL')}</Meta>
              <Meta>{post.author.name}</Meta>
            </Metadata>

            <BlogPostContent content={post.body.json} id={post.sys.id} />
            {post.author.bio && (
              <BlogPostAuthor author={post.author.bio.json} />
            )}
          </Container>
        </Constrain>
        <BlogPostCTA />
        <LoggedOutFooter />
      </AboutTopBarLayout>
    </ErrorBoundary>
  )
}
