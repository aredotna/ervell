import React from 'react'
import styled, { css } from 'styled-components'
import { space } from 'styled-system'

const mixin = css`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  position: relative;
  width: ${x => x.size}px;
  height: ${x => x.size}px;
  background-color: ${x => x.theme.colors.gray.semiLight};
  ${x => x.circle && 'border-radius: 50%;'}
  text-decoration: none;
  overflow: hidden;
  user-select: none;
  ${space}

  img {
    width: 100%;
    height: 100%;
  }
`

const e = React.createElement

const Avatar = styled(({ tag, children, circle, ...rest }) =>
  e(tag, rest, children)
)`
  ${mixin}
`

Avatar.defaultProps = {
  tag: 'a',
  size: 40,
  circle: false,
}

export default Avatar
