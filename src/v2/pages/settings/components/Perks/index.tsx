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

interface PerkProps {
  isSupporter: boolean
}

const NonPremiumDiscord: React.FC = () => {
  const url = 'https://discord.gg/GapEUYhXCj'
  return (
    <Text>
      Join our Office Hours Discord server{' '}
      <Text display="inline" color="state.premium">
        <a href={url}>here</a>
      </Text>
      .
    </Text>
  )
}

const AnnualPerk: React.FC<PerkProps> = () => {
  return (
    <Text>
      Our Annual books are sold out, hold tight for 2021 Supporter perks.
    </Text>
  )
}

const StorePerk: React.FC<PerkProps> = () => {
  return (
    <Text>
      For a 20% discount on any item in our{' '}
      <a href="https://store.are.na">Store</a>, use the coupon{' '}
      <Text display="inline" color="state.premium">
        2021TWENTY
      </Text>{' '}
      on checkout.
    </Text>
  )
}

const ReportPerk: React.FC<PerkProps> = () => {
  return (
    <Text>
      Find all past investor reports{' '}
      <Text display="inline" color="state.premium">
        <a href="https://www.are.na/share/JlSzNKI">here</a>
      </Text>
    </Text>
  )
}

const PremiumDiscordPerk: React.FC<PerkProps> = ({ isSupporter }) => {
  const url = isSupporter
    ? 'https://discord.gg/WZTGRc4C5P'
    : 'https://discord.gg/GXfzEpFpby'
  return (
    <Text>
      Access premium-only channels on our Discord server{' '}
      <Text display="inline" color="state.premium">
        <a href={url}>here</a>
      </Text>
      .
    </Text>
  )
}

interface PerksProps {
  isPremium: boolean
  isSupporter: boolean
  isInvestor: boolean
}

const Perks: React.FC<PerksProps> = ({
  isPremium,
  isSupporter,
  isInvestor,
}) => {
  const premiumPerks = [PremiumDiscordPerk, StorePerk, AnnualPerk]
  const supporterPerks = [PremiumDiscordPerk, StorePerk, ReportPerk, AnnualPerk]

  if (isInvestor) {
    premiumPerks.push(ReportPerk)
  }

  const perks = isSupporter ? supporterPerks : premiumPerks

  if (!isPremium) {
    return (
      <Container>
        <Box my={8}>
          <Box pb={3} mb={8}>
            <Box py={4} borderBottom="1px solid" borderColor="gray.light">
              <NonPremiumDiscord />
            </Box>
          </Box>
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

      <Box mt={8} pb={5} borderBottom="1px solid" borderColor="gray.light">
        <Text color="gray.bold" fontWeight="bold">
          Current Perks
        </Text>
      </Box>
      <Box pb={3}>
        {perks.map((Perk, i) => {
          return (
            <Box
              py={4}
              key={`perk-${i}`}
              borderBottom="1px solid"
              borderColor="gray.light"
            >
              <Perk isSupporter={isSupporter} />
            </Box>
          )
        })}
      </Box>
    </Container>
  )
}

export default Perks
