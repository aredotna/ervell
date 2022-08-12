import React from 'react'
import styled from 'styled-components'
import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

const Container = styled(Box).attrs({
  mr: 5,
  py: 1,
  px: 2,
})`
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: ${p => p.theme.colors.background};
  border-radius: ${p => p.theme.radii.regular};
`

const Label = styled(Text).attrs({
  color: 'gray.medium',
})`
  display: inline;
`

interface AdvancedSearchReturnLabelProps {
  label?: string
}

export const AdvancedSearchReturnLabel: React.FC<AdvancedSearchReturnLabelProps> = ({
  label = 'See all results',
}) => {
  return (
    <Container>
      <Label f={0} mr={4}>
        ⮐{' '}
      </Label>
      <Label f={1}>{label}</Label>
    </Container>
  )
}

export default AdvancedSearchReturnLabel
