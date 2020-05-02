import React from 'react'
import styled from 'styled-components'
import { Link } from 'react-router-dom'

import Text from 'v2/components/UI/Text'

import { FeedObject } from '__generated__/FeedObject'
import { getBreadcrumbPath } from 'v2/util/getBreadcrumbPath'

const Span = styled.span``

const Word = styled(Text)`
  &:hover {
    color: ${x => x.theme.colors.gray.bold};
  }
`

interface FeedObjectLinkProps {
  obj: FeedObject
  label?: string
}

const FeedObjectLink: React.FC<FeedObjectLinkProps> = ({
  obj,
  label,
  ...rest
}) => {
  const href = obj && obj.__typename !== 'Null' && obj.href
  const visibility = obj && obj.__typename === 'Channel' && obj.visibility
  const title = label
    ? label
    : obj.__typename !== 'Null' && obj.__typename !== 'Comment' && obj.label

  const Tag = obj && obj.__typename !== 'Null' && obj.href ? Link : Span
  const fontWeight = href ? 'bold' : 'normal'

  const toParams = obj &&
    obj.__typename !== 'Null' && {
      pathname: href,
      state: getBreadcrumbPath(obj),
    }

  return (
    <Word
      display="inline"
      f={[5, 5, 6]}
      fontWeight={fontWeight}
      color={visibility ? `channel.${visibility}` : 'gray.base'}
      {...rest}
    >
      <Tag to={toParams} dangerouslySetInnerHTML={{ __html: title }} />
    </Word>
  )
}

export default FeedObjectLink
