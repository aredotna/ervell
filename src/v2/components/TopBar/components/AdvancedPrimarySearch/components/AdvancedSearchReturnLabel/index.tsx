import React from 'react'
import { useNavigate } from 'react-router'
import styled from 'styled-components'

import Box, { mixin as boxMixin } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import useRecentSearches from 'v2/hooks/useRecentSearches'
import { AdvancedSearchVariables } from '__generated__/AdvancedSearch'

const Label = styled(Text).attrs({
  color: 'gray.medium',
})`
  display: inline;
`

const Container = styled(Box).attrs({
  mr: 5,
  py: 1,
  px: 2,
})`
  ${boxMixin}
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.colors.background};
  border-radius: ${p => p.theme.radii.regular};

  &:hover ${Label} {
    color: ${p => p.theme.colors.gray.bold};
  }
`

interface AdvancedSearchReturnLabelProps {
  label?: string
  url?: string
  variables?: AdvancedSearchVariables
}

export const AdvancedSearchReturnLabel: React.FC<AdvancedSearchReturnLabelProps> = ({
  label = 'See all results',
  url,
  variables,
}) => {
  const navigate = useNavigate()
  const { addRecentSearch } = useRecentSearches()
  const onClick = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
    e.preventDefault()
    variables && addRecentSearch(variables)
    navigate(url)
  }

  return (
    <Container onClick={onClick}>
      <Label f={0} mr={4}>
        ⮐{' '}
      </Label>
      <Label f={1}>{label}</Label>
    </Container>
  )
}

export default AdvancedSearchReturnLabel
