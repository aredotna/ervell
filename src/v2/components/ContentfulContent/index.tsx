import React from 'react'
import styled from 'styled-components'
import reactStringReplace from 'react-string-replace'
import { MARKS, BLOCKS } from '@contentful/rich-text-types'
import { documentToReactComponents } from '@contentful/rich-text-react-renderer'

import Box from 'v2/components/UI/Box'

import HorizontalRule from 'v2/components/UI/HorizontalRule'
import Text, { TextProps } from '../UI/Text'
import { CustomerCount } from '../CustomerCount'
import { PremiumRevenue } from '../PremiumRevenue'
import { isEmpty } from 'lodash'

export const BaseText = styled(Text).attrs({
  my: 6,
  lineHeight: 2,
})`
  a[href*='#'] {
    vertical-align: super;
    font-size: 10px;
  }
  white-space: pre-wrap;
`

const HR = styled(HorizontalRule).attrs({ color: 'gray.light' })`
  height: 2px;
`

const Figure = styled.figure`
  margin: ${({ theme }) => `${theme.space[8]} auto`};
  padding: 0;
`

const Image = styled.img`
  width: 100%;
  max-width: 100%;
  margin: 0 auto;
  display: block;
`

const Figcaption = styled.figcaption`
  font-size: ${({ theme }) => theme.fontSizesIndexed.xs};
  margin: ${({ theme }) => `${theme.space[7]} 0`};
  color: ${({ theme }) => theme.colors.gray.base};
`

const UL = styled.ul`
  margin-bottom: 0;
`

const Ol = styled.ol`
  list-style-type: decimal;
  margin-left: ${props => props.theme.space[5]};
  color: ${({ theme }) => theme.colors.gray.base};

  li {
    margin: ${({ theme }) => `${theme.space[7]} 0`};
  }
`

const Li = styled.li`
  ${BaseText} {
    margin: 0;
  }
`

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

export const optionsWithEmbeds = (
  embedData: any,
  defaultFontSize: number | string,
  defaultFontColor?: string,
  underlineLinks?: boolean,
  boldLinks?: boolean
) => {
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
                `${block.small} 800w`,
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
      [BLOCKS.UL_LIST]: (_, children) => <UL>{children}</UL>,
      [BLOCKS.OL_LIST]: (_, children) => <Ol>{children}</Ol>,
      [BLOCKS.LIST_ITEM]: (_, children) => <Li>{children}</Li>,
      [BLOCKS.QUOTE]: (_, children) => <Blockquote>{children}</Blockquote>,
      [BLOCKS.HR]: () => <HR />,
      [BLOCKS.PARAGRAPH]: (_, children) => {
        if (isEmpty(children)) {
          return null
        }
        if (
          children[0] &&
          typeof children[0] === 'string' &&
          children[0].indexOf('<') === 0
        ) {
          return <div dangerouslySetInnerHTML={{ __html: children[0] }} />
        }

        let parsedChildren = reactStringReplace(
          children,
          '[premium-count]',
          () => (
            <strong>
              <CustomerCount />
            </strong>
          )
        )
        parsedChildren = reactStringReplace(
          parsedChildren,
          '[premium-revenue]',
          () => (
            <strong>
              <PremiumRevenue />
            </strong>
          )
        )

        return (
          <BaseText
            f={defaultFontSize}
            color={defaultFontColor}
            underlineLinks={underlineLinks}
            boldLinks={boldLinks}
          >
            {parsedChildren}
          </BaseText>
        )
      },
    },
    renderText: text => text,
  }
}

interface ContentfulContentProps {
  content: any
  embedData?: any
  defaultFontSize?: number | string
  defaultFontColor?: string
  underlineLinks?: boolean
  boldLinks?: boolean
  id?: string
}

export const ContentfulContent: React.FC<ContentfulContentProps &
  TextProps> = ({
  content,
  embedData,
  defaultFontSize = 4,
  defaultFontColor = 'gray.bold',
  underlineLinks = true,
  boldLinks = false,
  id,
  ...rest
}) => {
  const parsedContent = documentToReactComponents(
    content,
    optionsWithEmbeds(
      embedData,
      defaultFontSize,
      defaultFontColor,
      underlineLinks,
      boldLinks
    )
  )

  return (
    <Container id={id} {...rest}>
      {parsedContent}
    </Container>
  )
}
