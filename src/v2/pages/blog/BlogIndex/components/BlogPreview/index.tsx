import React from 'react'
import styled from 'styled-components'
import { DateTime } from 'luxon'

import Text from 'v2/components/UI/Text'
import { Link } from 'react-router-dom'

const Post = styled(Link)`
  display: block;
  height: 550px;
  width: 250px;
  margin: 1em;
`

const Image = styled.img`
  width: 100%;
  height: 200px;
  object-fit: contain;
  margin-bottom: 1em;
`

const Category = styled(Text).attrs({
  f: 1,
  fontWeight: 'bold',
})`
  text-transform: uppercase;
`

const Title = styled(Text).attrs({
  f: 6,
  my: 3,
  fontWeight: 'bold',
})``

const Description = styled(Text).attrs({
  f: 3,
  lineHeight: 1.5,
  mb: 4,
})``

const Meta = styled(Text).attrs({
  f: 3,
})``

interface BlogPreviewProps {
  post: any
}

export const BlogPreview: React.FC<BlogPreviewProps> = ({ post }) => {
  return (
    <Post to={`/blog/${post.slug}`} key={`post-${post.slug}`}>
      {post.image && (
        <Image
          srcSet={[
            `${post.image.small} 250w`,
            `${post.image.medium} 500w`,
            `${post.image.large} 750w`,
          ]}
        />
      )}

      <Category>{post.category}</Category>
      <Title>{post.title}</Title>
      <Description>{post.previewText}</Description>
      <Meta>{DateTime.fromISO(post.displayDate).toISODate()}</Meta>
      <Meta>{post.author.name}</Meta>
    </Post>
  )
}
