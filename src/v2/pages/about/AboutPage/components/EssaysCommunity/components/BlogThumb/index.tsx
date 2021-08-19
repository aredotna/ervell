import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

import { EssaysCommunity_blogPostCollection_items } from '__generated__/contentful/EssaysCommunity'

const Container = styled(Box).attrs({
  mr: 5,
  mb: 5,
  p: 4,
  display: 'flex',
})`
  flex-basis: calc(50% - 20px);
  border: 1px solid ${x => x.theme.colors.gray.light};
  min-width: 0;
`

const Link = styled.a`
  display: flex;
  flex-direction: column;
  width: 100%;
  height: 100%;
`

const Label = styled(Text).attrs({
  f: 1,
  color: 'gray.block',
})`
  text-transform: uppercase;
`

const Title = styled(Text).attrs({
  f: 2,
  color: 'gray.block',
  mb: 5,
})`
  max-width: 100%;
  text-overflow: ellipsis;
  white-space: nowrap;
  overflow: hidden;
`

interface BlogThumbProps {
  post: EssaysCommunity_blogPostCollection_items
}

export const BlogThumb: React.FC<BlogThumbProps> = ({ post }) => {
  return (
    <Container>
      <Link href={`/blog/${post.slug}`}>
        <Label>{post.category}</Label>
        <Title>{post.title}</Title>
        <img width={85} height={53} src={post.image.url} />
      </Link>
    </Container>
  )
}
