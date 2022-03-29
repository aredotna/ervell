import React from 'react'
import styled, { css } from 'styled-components'

import { Mode } from 'v2/components/Cell/components/Konnectable/types'
import { KonnectableColor } from 'v2/components/Cell/components/Konnectable/components/KonnectableColor'

import Box from 'v2/components/UI/Box'
import { SansSerifText } from 'v2/components/UI/SansSerifText'

import isHexColor from 'v2/util/isHexColor'

import { KonnectableText as KonnectableTextData } from '__generated__/KonnectableText'

const hoverMixin = css`
  border: 1px solid ${props => props.theme.colors.gray.semiLight};
`

const Container = styled(Box).attrs({
  pt: 4,
  px: 5,
})`
  position: relative;
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: 1px solid ${props => props.theme.colors.gray.light};
  text-align: left;

  ${props => props.mode === Mode.HOVER && hoverMixin}

  &:hover {
    ${hoverMixin}
  }

  // If text is long: overflow with a small gradient fade out
  ${props =>
    props.length > 500 &&
    `
    &:after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 3em;
      background: linear-gradient(${props.theme.colors.utility.transparent} 0%, ${props.theme.colors.background} 100%);
    }
  `}
`

interface Props {
  text: KonnectableTextData
  mode: Mode
}

export const KonnectableText: React.FC<Props> = ({
  text: { content, raw },
  mode = Mode.RESTING,
  ...rest
}) => {
  if (isHexColor(raw)) {
    return <KonnectableColor color={raw} {...rest} />
  }

  return (
    <Container length={content.length} mode={mode} {...rest}>
      {/* We should truncate content to prevent an excess of data being needlessly returned */}
      {/* Try truncating markdown source then rendering it as a possible solution */}
      <SansSerifText
        isSmall
        color={{ [Mode.HOVER]: 'gray.bold', [Mode.RESTING]: 'gray.base' }[mode]}
        dangerouslySetInnerHTML={{ __html: content }}
      />
    </Container>
  )
}

export default KonnectableText
