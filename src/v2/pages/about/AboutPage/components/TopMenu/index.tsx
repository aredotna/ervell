import React from 'react'
import styled from 'styled-components'
import { useScrollSections } from 'v2/util/react-scroll-section'

import Box from 'v2/components/UI/Box'
import Icons from 'v2/components/UI/Icons'
import Button from 'v2/components/UI/GenericButton'
import constants from 'v2/styles/constants'
import Text from 'v2/components/UI/Text'

const Container = styled(Box).attrs({ py: 6, px: 6 })`
  display: flex;
  flex-direction: row;
  justify-content: space-around;
  position: fixed;
  top: 0;
  right: 0;
  left: 0;
  background: ${({ theme }) => theme.colors.background};
  z-index: ${constants.z.header};
  height
`

const MenuContainer = styled(Box).attrs({})`
  position: fixed;
  top: 50px;
`

const Item = styled(Text).attrs({
  color: 'gray.regular',
})`
  cursor: pointer;
  &:hover {
    color: ${({ theme }) => theme.colors.gray.bold};
  }
  ${({ selected, theme }) => {
    return selected && `color: ${theme.colors.gray.bold};`
  }}
`

export const TopMenu: React.FC = () => {
  const sections = useScrollSections()
  return (
    <Container>
      <Box flex={1}>
        <a href="/">
          <Icons name="ArenaMark" size="1.5em" color="gray.block" />
        </a>

        <MenuContainer>
          {sections.map(({ id, onClick, selected }, index) => {
            return (
              <Item
                key={index}
                selected={selected}
                onClick={onClick}
                dangerouslySetInnerHTML={{ __html: id }}
              />
            )
          })}
        </MenuContainer>
      </Box>

      <Box>
        <Button f={1} mr={6} color="gray.block">
          Login
        </Button>
        <Button f={1} color="gray.block">
          Sign Up
        </Button>
      </Box>
    </Container>
  )
}
