import React from 'react'
import styled from 'styled-components'
import sanitizeHtml from 'sanitize-html'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'

import { TableData } from '../../../ChannelTableContents/lib/types'

const TextContainer = styled(Box).attrs({
  px: 5,
  color: 'gray.bold',
})`
  width: 420px;
`

const Wrapper = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})``

const Img = styled.div`
  width: 30px;
  height: 30px;
  margin-right: ${x => x.theme.space[4]};
  background-size: contain;
  background-position: center center;
  background-repeat: no-repeat;
  background-image: url(${props => props.src});
  image-rendering: smooth;
`

const Source = styled(Text).attrs({
  f: 1,
  overFlowEllipsis: true,
  color: 'gray.bold',
})`
  text-align: left;
`

export const ContentCell = ({
  value: content,
}: {
  value: TableData
}): JSX.Element | null => {
  if ('isNull' in content) {
    return null
  }

  const html =
    content.__typename === 'Text' ? sanitizeHtml(content.content) : null

  switch (content.__typename) {
    case 'Attachment':
    case 'Embed':
    case 'Link':
    case 'Image':
      return (
        <Wrapper>
          <Img src={content.image_url} />
          {content?.source?.provider_url && content.source.url && (
            <a href={content.source.url} style={{ display: 'flex' }}>
              <Source>{content.source.provider_url}</Source>
              <Icons
                name="Link"
                size="0.6rem"
                color="gray.regular"
                mt={2}
                mb={2}
                mr={2}
                ml={3}
                flexShrink={0}
              />
            </a>
          )}
        </Wrapper>
      )
    case 'Text':
      return (
        <TextContainer length={content.content.length}>
          <Text
            f={1}
            dangerouslySetInnerHTML={{ __html: html }}
            color="gray.bold"
            overflowEllipsis
          />
        </TextContainer>
      )
    default:
      return null
  }
}
