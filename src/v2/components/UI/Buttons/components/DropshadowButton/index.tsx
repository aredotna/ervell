import styled, { css } from 'styled-components'

import constants from 'v2/styles/constants'

import { mixin as buttonMixin } from 'v2/components/UI/GenericButton'

export const activeMixin = css`
  border: 1px solid ${props => props.theme.colors.gray.bold};
  color: ${props => props.theme.colors.gray.bold};
  background-color: ${props => props.theme.colors.gray.light};
`

export const hoverMixin = css`
  border: 1px solid ${props => props.theme.colors.gray.bold};
  color: ${props => props.theme.colors.gray.bold};
  background-color: ${props => props.theme.colors.gray.light};
`

const mixin = css`
  ${buttonMixin}
  border-radius: ${constants.radii.subtle};

  ${x => x.hover && hoverMixin}
  &:hover {
    ${hoverMixin}
  }

  ${x => x.active && activeMixin}
  &:active {
    ${activeMixin}
  }
  padding: ${props => props.theme.space[4]} ${props => props.theme.space[6]};
  color: ${props => props.theme.colors.gray.bold};
  border: 1px solid ${props => props.theme.colors.gray.bold};
  box-shadow: 2px 2px 0px ${props => props.theme.colors.gray.bold};
  background-color: ${props => props.theme.colors.background};
`

export const DropshadowButton = styled.button`
  ${mixin}
`

export const DropshadowButtonLink = styled.a`
  ${mixin}
`
