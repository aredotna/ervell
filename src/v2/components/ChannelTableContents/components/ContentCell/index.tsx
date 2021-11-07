import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'

import { TableData } from '../../lib/types'

const TextContainer = styled(Box).attrs({
  px: 5,
})`
  width: 420px;
`

const Wrapper = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'row',
  alignItems: 'center',
})``

const Img = styled.img`
  width: 30px;
  height: 30px;
  margin-right: ${x => x.theme.space[4]};
`

const Source = styled(Text).attrs({
  f: 1,
  overFlowEllipsis: true,
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
                size="0.5rem"
                color="gray.regular"
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
            dangerouslySetInnerHTML={{ __html: content.content }}
            overflowEllipsis
          />
        </TextContainer>
      )
    default:
      return null
  }
}
