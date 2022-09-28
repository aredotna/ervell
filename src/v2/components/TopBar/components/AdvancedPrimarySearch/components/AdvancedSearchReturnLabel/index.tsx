import React from 'react'
import { Link } from 'react-router-dom'
import styled from 'styled-components'

import { mixin as boxMixin } from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import constants from 'v2/styles/constants'

const Label = styled(Text).attrs({
  color: 'gray.medium',
})`
  display: inline;
`

const Container = styled(Link).attrs({
  mr: 5,
  py: 1,
  px: 2,
})`
  ${boxMixin}
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.colors.background};
  border-radius: ${p => p.theme.radii.regular};

  &:hover ${Label} {
    color: ${p => p.theme.colors.gray.bold};
  }

  ${constants.media.small`
    display: none;
  `}
`

interface AdvancedSearchReturnLabelProps {
  label?: string
  url?: string
}

export const AdvancedSearchReturnLabel: React.FC<AdvancedSearchReturnLabelProps> = ({
  label = 'See all results',
  url,
}) => {
  return (
    <Container to={url}>
      <Label f={0} mr={4}>
        ⮐{' '}
      </Label>
      <Label f={1}>{label}</Label>
    </Container>
  )
}

export default AdvancedSearchReturnLabel
