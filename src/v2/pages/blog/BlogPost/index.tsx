import React from 'react'
import { useQuery } from '@apollo/client'
import styled from 'styled-components'
import moment from 'moment'

import ErrorBoundary from 'v2/components/UI/ErrorBoundary'
import Description from 'v2/components/UI/Head/components/Description'
import Image from 'v2/components/UI/Head/components/Image'

import Title from 'v2/components/UI/Head/components/Title'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import HorizontalRule from 'v2/components/UI/HorizontalRule'

import { BlogPostContent } from './components/BlogPostContent'
import { BlogPostAuthor } from './components/BlogPostAuthor'
import { BlogPostCTA } from './components/BlogPostCTA'
import { LoggedOutFooter } from 'v2/components/LoggedOutFooter'
import { AboutTopBarLayout } from 'v2/components/UI/Layouts/AboutTopBarLayout'

import BLOG_POST_CONTENT_QUERY from 'v2/pages/blog/BlogPost/queries/BlogPostBySlug'
import { BlogPostBlocks } from './components/BlogPostBlocks'

interface BlogPostProps {
  slug: string
}

const Container = styled(Box).attrs({ mt: 10, mx: [5, 'auto'] })`
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

const HR = styled(HorizontalRule).attrs({ color: 'gray.light', mb: 10 })`
  height: 2px;
`

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
      <Description>{post && post.previewText}</Description>
      <Image>{post && post.image && post.image.medium}</Image>

      <AboutTopBarLayout>
        <Container>
          <Category>{post.category}</Category>
          <PostTitle>{post.title}</PostTitle>

          <Metadata>
            <Meta>{moment(post.displayDate).format('LL')}</Meta>
            <Meta>{post.author.name}</Meta>
          </Metadata>

          <BlogPostContent content={post.body.json} id={post.sys.id} />

          {post.blocksCollection.items.length > 0 && (
            <BlogPostBlocks blocks={post.blocksCollection.items} />
          )}

          {post.epilogue && post.epilogue.json && (
            <BlogPostContent content={post.epilogue.json} id={post.sys.id} />
          )}

          {post.footnotes && post.footnotes.json && (
            <>
              <HR />
              <Box mb={8} />
              <BlogPostContent
                content={post.footnotes.json}
                id={post.sys.id}
                divId="footnotes"
                defaultFontSize={2}
              />
            </>
          )}

          {post.author.bio && <BlogPostAuthor author={post.author.bio.json} />}
        </Container>
        <BlogPostCTA />
        <LoggedOutFooter />
      </AboutTopBarLayout>
    </ErrorBoundary>
  )
}
