import React, { useCallback, useState } from 'react'
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
  z-index: ${constants.z.header};

  ${constants.media.small`
    background: ${({ theme }) => theme.colors.background};
  `}
`

const IconContainer = styled(Box).attrs({
  display: 'flex',
  flexDirection: 'row',
})``

const HamburgerContainer = styled(Box).attrs({ mr: 6 })`
  display: none;
  ${constants.media.small`
    display: flex;
  `}
`

const MenuContainer = styled(Box).attrs({ px: 6 })`
  position: fixed;
  top: 50px;
  left: 0;

  ${constants.media.small`
    height: ${({ expanded }) => (expanded ? '100%' : '50px')};
    width: 100%;
    overflow: hidden;
    background: ${({ theme }) => theme.colors.background};

    &:after {
      content: '';
      display: block;
      position: absolute;
      right: 0;
      bottom: 0;
      left: 0;
      height: 3em;
      background: linear-gradient(${({ theme }) =>
        theme.colors.utility.transparent} 0%, ${({ theme }) =>
    theme.colors.background} 100%);
    }
  `}
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
  const [expanded, setExpanded] = useState<boolean>(false)
  const toggleExpanded = useCallback(() => {
    expanded ? setExpanded(false) : setExpanded(true)
  }, [expanded, setExpanded])

  return (
    <Container>
      <Box flex={1}>
        <IconContainer>
          <HamburgerContainer onClick={toggleExpanded}>
            <Icons name="Hamburger" size="1.5em" color="gray.block" />
          </HamburgerContainer>
          <a href="/">
            <Icons name="ArenaMark" size="1.5em" color="gray.block" />
          </a>
        </IconContainer>

        <MenuContainer expanded={expanded}>
          {sections.map(({ id, onClick, selected }, index) => {
            const handleClick = () => {
              setExpanded(false)
              onClick()
            }

            return (
              <Item
                key={index}
                selected={selected}
                onClick={handleClick}
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