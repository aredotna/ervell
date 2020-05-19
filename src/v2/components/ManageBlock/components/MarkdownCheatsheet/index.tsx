import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'

import constants from 'v2/styles/constants'
import Text from 'v2/components/UI/Text'

const Container = styled(Box).attrs({
  borderColor: 'gray.light',
  border: '1px solid',
  my: 6,
  p: 4,
})`
  border-radius: ${constants.radii.subtle};
`

const T = styled(Text).attrs({
  color: 'gray.medium',
  f: 1,
})`
  display: block;
`

const T2 = styled(T).attrs({
  color: 'gray.base',
  f: 3,
})`
  font-family: monospace;
`

const Inner = styled.table``
const Header = styled.tr`
  font-weight: normal;

  td {
    padding-bottom: 1em;
  }
`
const Row = styled.tr``
const Cell = styled.td`
  vertical-align: top;

  &:first-child {
    padding-right: 1em;
  }
`

export const MarkdownCheatsheet: React.FC = () => {
  return (
    <Container>
      <Inner>
        <Header>
          <Cell colSpan="2">
            <T>Text and description formatting</T>
          </Cell>
        </Header>
        <Row>
          <Cell>
            <T>Italic</T>
          </Cell>
          <Cell>
            <T2>
              *<em>italic</em>* or _<em>italic</em>_
            </T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Bold</T>
          </Cell>
          <Cell>
            <T2>
              **<strong>bold</strong>** or __<strong>bold</strong>__
            </T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Combined</T>
          </Cell>
          <Cell>
            <T2>
              **
              <strong>
                bold and _<em>italic</em>_
              </strong>
              **
            </T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Horizontal rule</T>
          </Cell>
          <Cell>
            <T2>---</T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Strikethrough</T>
          </Cell>
          <Cell>
            <T2>
              ~~<del>strike this</del>~~
            </T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Highlighted</T>
          </Cell>
          <Cell>
            <T2>
              ==<mark>highlighted</mark>==
            </T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Ordered list</T>
          </Cell>
          <Cell>
            <T2>1. List item</T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Unordered list</T>
          </Cell>
          <Cell>
            <T2>- List item</T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Links</T>
          </Cell>
          <Cell>
            <T2>[link text](link URL)</T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Inline code</T>
          </Cell>
          <Cell>
            <T2>`code`</T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Multiline code</T>
          </Cell>
          <Cell>
            <T2>```multiline code```</T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Blockquote</T>
          </Cell>
          <Cell>
            <T2>&gt; I'm a quote</T2>
          </Cell>
        </Row>
        <Row>
          <Cell>
            <T>Headers</T>
          </Cell>
          <Cell>
            <T2># h1</T2>
            <T2>## h2</T2>
            <T2>### h3</T2>
            <T2>#### h4</T2>
            <T2>##### h5</T2>
            <T2>###### h6</T2>
          </Cell>
        </Row>
      </Inner>
    </Container>
  )
}
