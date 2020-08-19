import React from 'react'
import styled from 'styled-components'

import { Document, MARKS, BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const Container = styled(Box)`
  border-top: 2px solid ${props => props.theme.colors.gray.light};
  padding-top: ${props => props.theme.space[8]};
  margin-top: ${props => props.theme.space[8]};
`

const BaseText = styled(Text).attrs({
  my: 6,
  lineHeight: 2,
  underlineLinks: true,
})``

const options = {
  renderMark: {
    [MARKS.BOLD]: text => <BaseText fontWeight="bold">{text}</BaseText>,
  },
  renderNode: {
    [BLOCKS.EMBEDDED_ASSET]: node => {
      // const { title, description } = node.data.target.fields;

      console.log({ node, data: node.data })
      return null
    },
    [BLOCKS.HEADING_1]: (_, children) => (
      <BaseText fontWeight="bold" f={9}>
        {children}
      </BaseText>
    ),
    [BLOCKS.HEADING_2]: (_, children) => (
      <BaseText fontWeight="bold" f={6}>
        {children}
      </BaseText>
    ),
    [BLOCKS.PARAGRAPH]: (_, children) => {
      if (
        children[0] &&
        typeof children[0] === 'string' &&
        children[0].indexOf('<') === 0
      ) {
        return <div dangerouslySetInnerHTML={{ __html: children[0] }} />
      }
      return <BaseText>{children}</BaseText>
    },
  },
  renderText: text => text.replace('!', '?'),
}

interface BlogPostAuthorProps {
  author: Document
}

export const BlogPostAuthor: React.FC<BlogPostAuthorProps> = ({ author }) => {
  const parsedContent = documentToReactComponents(author, options)

  return <Container>{parsedContent}</Container>
}
