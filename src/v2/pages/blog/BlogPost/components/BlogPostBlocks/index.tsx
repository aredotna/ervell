import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import { BlokkWithQuery } from 'v2/components/Cell/components/Konnectable'

import constants from 'v2/styles/constants'
import { ContentfulContent } from 'v2/components/ContentfulContent'

const Outer = styled(Box).attrs({ my: 9 })``

const Container = styled(Box).attrs({ px: 5, pb: 5, my: 8 })`
  border-left: 2px solid ${({ theme }) => theme.colors.gray.light};
  border-right: 2px solid ${({ theme }) => theme.colors.gray.light};

  display: flex;
  flex-direction: row;

  ${constants.media.mobile`
    flex-direction: column;
  `}
`

const TextContainer = styled(Box).attrs({ mr: 5 })``

const BlockContainer = styled(Box).attrs({ ml: 5, pt: [8, 0] })`
  display: flex;

  ${constants.media.mobile`
    margin: 0 auto;
  `}
`

const Block = styled(BlokkWithQuery).attrs({
  width: '225px',
  height: '225px',
})``

interface BlogPostBlock {
  sys: {
    id: string
  }
  blockUrl: string
  text: {
    json: any
  }
}

interface BlogPostBlocksProps {
  blocks: BlogPostBlock[]
}

export const BlogPostBlocks: React.FC<BlogPostBlocksProps> = ({ blocks }) => {
  return (
    <Outer>
      {blocks.map(block => {
        const { text, blockUrl, sys } = block
        const blockID = blockUrl.split('/').pop()
        return (
          <Container key={sys.id}>
            <TextContainer>
              <ContentfulContent content={text.json} />
            </TextContainer>
            <BlockContainer>
              <Block id={blockID} />
            </BlockContainer>
          </Container>
        )
      })}
    </Outer>
  )
}
