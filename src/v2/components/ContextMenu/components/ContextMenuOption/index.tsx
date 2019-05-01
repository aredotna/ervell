import React from 'react'
import styled from 'styled-components'

import Link from 'v2/components/UI/Link'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'

const Container = styled(Link).attrs({
  role: 'button',
  tabIndex: 0,
  bg: 'white',
})`
  display: flex;
  align-items: center;
  justify-content: flex-start;
  cursor: pointer;

  &:hover {
    background-color: ${props => props.theme.colors.gray.light};
  }
`

const Label = styled(Text).attrs({
  f: 3,
  pr: 8,
  py: 4,
})`
  flex: 1;
  font-weight: bold;
`

interface Props {
  children: React.ReactNode
  iconName?: string
  href?: string
  onClick?: (e: React.MouseEvent<HTMLInputElement>) => any
}

export const ContextMenuOption: React.FC<Props> = ({
  iconName,
  children,
  onClick,
  href,
  ...rest
}) => (
  <Container
    onClick={onClick}
    {...href && {
      href,
      target: '_blank',
      rel: 'noopener noreferrer',
    }}
    {...rest}
  >
    {iconName && <Icons mx={6} color="gray.medium" name={iconName} />}

    <Label pl={iconName ? undefined : 6}>{children}</Label>
  </Container>
)
