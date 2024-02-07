import React from 'react'
import styled from 'styled-components'
import sharify from 'sharify'

import Text from 'v2/components/UI/Text'
import Box from 'v2/components/UI/Box'
import { GenericButtonLink as Button } from 'v2/components/UI/GenericButton'

const {
  data: { APP_URL },
} = sharify

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
    <Text boldLinks>
      Join our Office Hours Discord server{' '}
      <Text display="inline" color="state.premium">
        <a href={url}>here</a>
      </Text>
      .
    </Text>
  )
}

const AnnualPerk2022: React.FC<PerkProps> = () => {
  const url = 'https://store.are.na/products/are-na-annual-2022'
  return (
    <Text boldLinks>
      <Text color="state.premium" display="inline">
        <a href={url}>Free 2022 Are.na Annual </a>
      </Text>
      (use code PORT2022)
    </Text>
  )
}

const AnnualPerk2023: React.FC<PerkProps> = () => {
  const url = 'https://store.are.na/products/are-na-annual-2023'
  return (
    <Text boldLinks>
      <Text color="state.premium" display="inline">
        <a href={url}>Free 2023 Are.na Annual </a>
      </Text>
      (use code ASASERVICE2023)
    </Text>
  )
}

const AnnualPerk2024: React.FC<PerkProps> = () => {
  const url = 'https://store.are.na/products/are-na-annual-2024'
  return (
    <Text boldLinks>
      <Text color="state.premium" display="inline">
        <a href={url}>Free 2024 Are.na Annual </a>
      </Text>
      (use code TRACINGS2024)
    </Text>
  )
}

const StickerPerk: React.FC<PerkProps> = () => {
  const url =
    'https://store.are.na/collections/frontpage/products/sticker-sheet-v2'
  return (
    <Text boldLinks>
      <Text color="state.premium" display="inline">
        <a href={url}>Free Are.na Stickers</a>
      </Text>{' '}
      (use code STICK21)
    </Text>
  )
}

const StorePerk: React.FC<PerkProps> = () => {
  return (
    <Text boldLinks>
      For a 20% discount on any item in our{' '}
      <a href="https://store.are.na">Store</a>, use the coupon{' '}
      <Text display="inline" color="state.premium">
        TWENTY2023
      </Text>{' '}
      on checkout.
    </Text>
  )
}

const BirthdayStickerPerk: React.FC<PerkProps> = () => {
  return (
    <Text boldLinks>
      🎁 Happy Are.na Birthday 🎁 <br />
      <br />
      Use the coupon{' '}
      <Text display="inline" color="state.premium">
        ITSMYBIRTHDAYGIVEMEASTICKER
      </Text>{' '}
      to get your{' '}
      <a href="https://store.are.na/collections/frontpage/products/they-dont-know-sticker">
        free sticker
      </a>
      .
    </Text>
  )
}

const ReportPerk: React.FC<PerkProps> = () => {
  return (
    <Text boldLinks>
      Find all past investor reports{' '}
      <Text display="inline" color="state.premium">
        <a href={`${APP_URL}/share/JlSzNKI`}>here</a>
      </Text>
    </Text>
  )
}

const SanderPerk: React.FC<PerkProps> = () => {
  return (
    <Text boldLinks>
      Try out the newest Are.na client{' '}
      <Text display="inline" color="state.premium">
        <a href="https://sander.are.na">sander.are.na</a>
      </Text>
    </Text>
  )
}

const PremiumDiscordPerk: React.FC<PerkProps> = ({ isSupporter }) => {
  const url = isSupporter
    ? 'https://discord.gg/WZTGRc4C5P'
    : 'https://discord.gg/GXfzEpFpby'
  return (
    <Text boldLinks>
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
  hasHadRecentBirthday: boolean
}

const Perks: React.FC<PerksProps> = ({
  isPremium,
  isSupporter,
  isInvestor,
  hasHadRecentBirthday,
}) => {
  const premiumPerks = [PremiumDiscordPerk, StorePerk]
  const supporterPerks = [
    SanderPerk,
    PremiumDiscordPerk,
    StorePerk,
    ReportPerk,
    AnnualPerk2022,
    AnnualPerk2023,
    AnnualPerk2024,
    StickerPerk,
  ]

  if (isInvestor) {
    premiumPerks.push(ReportPerk)
    premiumPerks.push(SanderPerk)
  }

  if (isPremium && hasHadRecentBirthday) {
    premiumPerks.push(BirthdayStickerPerk)
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
