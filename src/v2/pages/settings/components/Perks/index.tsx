import React from 'react'
import styled from 'styled-components'

import Text from 'v2/components/UI/Text'
import Box from 'v2/components/UI/Box'
import { GenericButtonLink as Button } from 'v2/components/UI/GenericButton'

const Container = styled(Box).attrs({
  mx: 'auto',
})`
  max-width: 470px;
  width: 100%;
`

const AnnualPerk: React.FC = () => {
  return (
    <Text>
      For a $4 discount on our <strong>Are.na Annual 2020 book</strong>, use the
      coupon{' '}
      <Text display="inline" color="state.premium">
        ANNUAL-B5HS
      </Text>{' '}
      on checkout.
    </Text>
  )
}

interface PerksProps {
  isPremium: boolean
}

const Perks: React.FC<PerksProps> = ({ isPremium }) => {
  const perks = [AnnualPerk]

  if (!isPremium) {
    return (
      <Container>
        <Box my={8}>
          <Text color="gray.semiBold">
            <strong>
              <a href="/settings/billing">Upgrade to Premium</a>
            </strong>{' '}
            for periodic perks, discounts, events, and access to special
            features (plus much more).
          </Text>
        </Box>
        <Box my={8} textAlign="center">
          <Button href="/settings/billing" color="state.premium">
            Upgrade now
          </Button>
        </Box>
      </Container>
    )
  }

  return (
    <Container>
      <Box my={8}>
        <Text color="gray.medium">
          Ocassionally we offer perks, discounts, events, and special features
          for our Premium members.
        </Text>
      </Box>

      <Box mt={8} pb={3} borderBottom="1px solid" borderColor="gray.light">
        <Text color="gray.bold" fontWeight="bold">
          Current Perks
        </Text>
      </Box>
      <Box pb={3}>
        {perks.map((Perk, i) => {
          return (
            <Box
              py={3}
              key={`perk-${i}`}
              borderBottom="1px solid"
              borderColor="gray.light"
            >
              <Perk />
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}

export default Perks
