import React from 'react'
import styled from 'styled-components'
import { Document, MARKS, BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Box from 'v2/components/UI/Box'

import HorizontalRule from 'v2/components/UI/HorizontalRule'
import Text from '../UI/Text'

const BaseText = styled(Text).attrs({
  my: 6,
  lineHeight: 2,
  underlineLinks: true,
})`
  a[href*='#'] {
    vertical-align: super;
    font-size: 10px;
  }
`

const HR = styled(HorizontalRule).attrs({ color: 'gray.light' })`
  height: 2px;
`

const Figure = styled.figure`
  margin: ${({ theme }) => `${theme.space[8]} auto`};
  padding: 0;
`

const Image = styled.img`
  max-width: 100%;
  margin: 0 auto;
  display: block;
`

const Figcaption = styled.figcaption`
  font-size: ${({ theme }) => theme.fontSizesIndexed.xs};
  margin: ${({ theme }) => `${theme.space[7]} 0`};
  color: ${({ theme }) => theme.colors.gray.base};
`

const Ol = styled.ol`
  list-style-type: decimal;
  margin-left: ${props => props.theme.space[5]};
  color: ${({ theme }) => theme.colors.gray.base};

  li {
    margin: ${({ theme }) => `${theme.space[7]} 0`};
  }
`

const Li = styled.li``

const Blockquote = styled.blockquote`
  border-left: 2px solid ${({ theme }) => theme.colors.gray.light};
  padding-left: ${({ theme }) => theme.space[6]};
  font-style italic;
  margin: ${({ theme }) => `${theme.space[8]} 0`};
`

const Container = styled(Box)`
  iframe {
    border: none;
    margin: 4em auto;
  }

  iframe.arena-iframe {
    height: 560px !important;
  }
`

export const optionsWithEmbeds = (embedData: any, defaultFontSize: number) => {
  return {
    renderMark: {
      [MARKS.BOLD]: text => (
        <BaseText fontWeight="bold" display="inline" f={defaultFontSize}>
          {text}
        </BaseText>
      ),
    },
    renderNode: {
      [BLOCKS.EMBEDDED_ASSET]: node => {
        if (!embedData) {
          return null
        }

        const block = embedData.blogPost.body.links.assets.block.find(b => {
          return b.sys.id === node.data.target.sys.id
        })

        return (
          <Figure>
            <Image
              srcSet={[
                `${block.small} 670w`,
                `${block.medium} 1340w`,
                `${block.large} 2010w`,
              ]}
            />
            {block.description && (
              <Figcaption
                dangerouslySetInnerHTML={{ __html: block.description }}
              />
            )}
          </Figure>
        )
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
      [BLOCKS.OL_LIST]: (_, children) => <Ol>{children}</Ol>,
      [BLOCKS.LIST_ITEM]: (_, children) => <Li>{children}</Li>,
      [BLOCKS.QUOTE]: (_, children) => <Blockquote>{children}</Blockquote>,
      [BLOCKS.HR]: () => <HR />,
      [BLOCKS.PARAGRAPH]: (_, children) => {
        if (
          children[0] &&
          typeof children[0] === 'string' &&
          children[0].indexOf('<') === 0
        ) {
          return <div dangerouslySetInnerHTML={{ __html: children[0] }} />
        }
        return <BaseText f={defaultFontSize}>{children}</BaseText>
      },
    },
    renderText: text => text,
  }
}

interface ContentfulContentProps {
  content: Document
  embedData?: any
  defaultFontSize?: number
  id?: string
}

export const ContentfulContent: React.FC<ContentfulContentProps> = ({
  content,
  embedData,
  defaultFontSize = 4,
  id,
}) => {
  const parsedContent = documentToReactComponents(
    content,
    optionsWithEmbeds(embedData, defaultFontSize)
  )

  return <Container id={id}>{parsedContent}</Container>
}
