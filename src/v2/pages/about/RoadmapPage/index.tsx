import React from 'react'
import styled from 'styled-components'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'
import { useQuery } from '@apollo/client'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

import {
  Headline,
  Subheadline,
  Description,
} from 'v2/pages/about/components/Text'
import { GenericButtonLink as Button } from 'v2/components/UI/GenericButton'
import {
  Table,
  TableSection,
  Column,
  LightColumn,
  ColumnHeader,
  Cell,
} from 'v2/pages/about/RoadmapPage/components/Table'
import constants from 'v2/styles/constants'
import GoalMeter from 'v2/pages/about/RoadmapPage/components/GoalMeter'

import useSerializedMe from 'v2/hooks/useSerializedMe'

import { ChangelogChannelContents } from 'v2/pages/about/RoadmapPage/queries/ChangelogChannelContents'
import {
  ChangelogChannelContents as ChangelogChannelContentsType,
  ChangelogChannelContentsVariables,
  ChangelogChannelContents_channel_blokks_Text,
} from '__generated__/ChangelogChannelContents'
import KonnectableText from 'v2/components/Cell/components/Konnectable/components/KonnectableText'
import { Mode } from 'v2/components/Cell/components/Konnectable/types'

const Container = styled(Box).attrs({
  mt: 9,
})``

const Paragraph = styled(Description).attrs({
  mx: 'auto',
  my: 7,
  align: 'left',
})`
  max-width: 670px;
  width: 100%;
`

const SmallParagraph = styled(Paragraph)`
  max-width: 460px;
  width: 100%;
  height: 7em;
`

const Link = styled.a`
  * {
    font-size: 1em !important;
  }
  li {
    font-weight: normal;
  }
`

const SupportOptions = styled(Box)`
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  justify-content: center;

  ${constants.media.small`
    align-items: center;
    flex-direction: column;
  `}
`

const ContributeButton = styled(Button).attrs({
  f: 5,
  flex: 1,
  alignSelf: 'center',
})`
  background-color: ${x => x.theme.colors.state.supporter};
  border-color: ${x => x.theme.colors.state.supporter};
  color: white;

  &:hover {
    border-color: ${x => x.theme.colors.state.supporter};
    background-color: ${props => props.theme.colors.background};
    color: ${x => x.theme.colors.state.supporter};
  }
`

const PremiumButton = styled(Button).attrs({
  f: 5,
  flex: 1,
  alignSelf: 'center',
})`
  background-color: ${x => x.theme.colors.state.premium};
  border-color: ${x => x.theme.colors.state.premium};
  color: white;

  &:hover {
    border-color: ${x => x.theme.colors.state.premium};
    background-color: ${props => props.theme.colors.background};
    color: ${x => x.theme.colors.state.premium};
  }
`

interface RoadmapPageProps {
  roadmap: any
}

export const RoadmapPage: React.FC<RoadmapPageProps> = ({ roadmap }) => {
  const serializedMe = useSerializedMe()

  const lastUpdated = new Date(roadmap.sys.updatedAt).toLocaleDateString(
    'en-US',
    {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
  )

  const isLoggedIn = serializedMe && serializedMe.id !== null
  const isPremium = isLoggedIn && serializedMe.is_premium

  const premiumButtonCopy = isPremium ? '👍 Thank you!' : 'Go Premium'
  const premiumLink = isLoggedIn ? '/settings/billing' : '/pricing'

  const { data } = useQuery<
    ChangelogChannelContentsType,
    ChangelogChannelContentsVariables
  >(ChangelogChannelContents, { variables: { id: 'changelog' } })

  return (
    <Container pb={10}>
      <Headline color="gray.bold">Here&apos;s where we&apos;re at.</Headline>

      <Paragraph>
        Welcome to the Are.na roadmap. Here you can see what we’ve shipped
        recently, what we’re building next, and how we’re doing as a company.
      </Paragraph>

      <Paragraph>
        By sharing this information we aim to demystify the weird and wonderful
        process of working on a mostly bootstrapped web company. We’re working
        our hardest to build a space that’s mindful, respectful, and accountable
        to our thousands of lovely members. We have lots of ideas for how to do
        a better job, as well as lots of challenges.
      </Paragraph>

      <Paragraph pb={8}>
        This is meant to be as transparent as reasonably possible. If there’s
        something you don’t see here that you’d like to know, just email
        everyone@are.na.
      </Paragraph>

      <Headline color="gray.bold">Road to self-sustainability</Headline>

      <Paragraph pb={6}>
        Are.na’s mission is to build a member-supported community. Since
        we&apos;re accountable to our members instead of advertisers, our
        incentive is always to build a tool that fosters learning and genuine
        collaboration. This also means that Are.na’s future relies entirely on
        community contributions. Here’s how you can help:
      </Paragraph>

      <Paragraph pb={7}>
        <GoalMeter
          currentMrr={roadmap.fields.rawMrr}
          goalMrr={roadmap.fields.rawGoalMrr}
          goalDate={roadmap.fields.goalDate}
          monthlyActiveMembers={roadmap.fields.statsRawMaMs}
          totalPayingMembers={roadmap.fields.statsRawCustomers}
          monthlyConnections={roadmap.fields.statsRawConnections}
        />
      </Paragraph>

      <SupportOptions>
        <div>
          <Subheadline color="gray.bold">Premium</Subheadline>

          <SmallParagraph>
            Premium members get unlimited private content, additional privacy
            settings, an invitation to our members’ Slack and more features
            soon. More about Premium:
          </SmallParagraph>

          <Box
            justifyContent="center"
            alignItems="center"
            mt={7}
            mb={9}
            display="flex"
            flexDirection="column"
          >
            <PremiumButton href={premiumLink} disabled={isPremium}>
              {premiumButtonCopy}
            </PremiumButton>
            <Text f={1} textAlign="center" mt={4}>
              Premium members currently contribute&nbsp;
              <br />
              <strong>{roadmap.fields.statsPremiumRevenue}</strong>&nbsp; in
              monthly recurring revenue.
            </Text>
          </Box>
        </div>
        <div>
          <Subheadline color="gray.bold">Premium Supporter</Subheadline>

          <SmallParagraph>
            If you’re already Premium and want to chip in a little extra, you
            can upgrade to our Supporter tier. You’ll receive regular emails
            from the team, plus a free Are.na Annual.
          </SmallParagraph>

          <Box
            justifyContent="center"
            alignItems="center"
            mt={7}
            mb={9}
            display="flex"
            flexDirection="column"
          >
            <ContributeButton href={premiumLink}>
              Become a Supporter
            </ContributeButton>
            <Text f={2} textAlign="center" mt={4}>
              Supporters currently contribute&nbsp;
              <br />
              <strong>{roadmap.fields.statsPatronRevenue}</strong>&nbsp; in
              monthly recurring revenue.
            </Text>
          </Box>
        </div>
      </SupportOptions>

      <TableSection>
        <Subheadline pb={1} mb={0} color="gray.bold">
          Product Plan
        </Subheadline>
        <Text f={2} pb={8} color="gray.medium">
          Last updated: {lastUpdated}
        </Text>
        <Table>
          <Column>
            <ColumnHeader>In Progress</ColumnHeader>
            <Cell
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(roadmap.fields.productInProgress),
              }}
            />
          </Column>
          <Column>
            <ColumnHeader>Up next</ColumnHeader>
            <Cell
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(roadmap.fields.productUpNext),
              }}
            />
          </Column>
          <Column>
            <ColumnHeader>On the Horizon</ColumnHeader>
            <Cell
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(
                  roadmap.fields.productOnTheHorizon
                ),
              }}
            />
          </Column>
          <LightColumn>
            <ColumnHeader>Archived</ColumnHeader>
            <Cell
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(roadmap.fields.productCompleted),
              }}
            />
          </LightColumn>
        </Table>
      </TableSection>

      <TableSection>
        <Subheadline pb={1} mb={0} color="gray.bold">
          Changelog
        </Subheadline>
        <Text f={2} pb={8} color="gray.medium">
          Last updated: {data?.channel?.added_to_at}
        </Text>
        <Table>
          {data?.channel?.blokks.map(
            (blokk: ChangelogChannelContents_channel_blokks_Text) => {
              return (
                <Column key={blokk.id}>
                  <ColumnHeader>{blokk.created_at}</ColumnHeader>
                  <Cell>
                    <Link href={blokk.href}>
                      <Box height="190px">
                        <KonnectableText text={blokk} mode={Mode.RESTING} />
                      </Box>
                    </Link>
                  </Cell>
                </Column>
              )
            }
          )}
        </Table>
        <Box mt={7}>
          <Text boldLinks f={2}>
            <a href={data?.channel?.href}>See all logs</a>
          </Text>
        </Box>
      </TableSection>

      <TableSection>
        <Subheadline pb={1} mb={0} color="gray.bold">
          Company Vision
        </Subheadline>
        <Text f={3} pb={8} color="gray.medium">
          Last updated: {lastUpdated}
        </Text>
        <Table>
          <Column>
            <ColumnHeader>Revenue &amp; Strategy</ColumnHeader>
            <Cell
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(roadmap.fields.businessRevenue),
              }}
            />
          </Column>
          <Column>
            <ColumnHeader>Ethics</ColumnHeader>
            <Cell
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(roadmap.fields.businessEthics),
              }}
            />
          </Column>
          <Column>
            <ColumnHeader>Community</ColumnHeader>
            <Cell
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(roadmap.fields.businessCommunity),
              }}
            />
          </Column>
          <Column>
            <ColumnHeader>Team</ColumnHeader>
            <Cell
              dangerouslySetInnerHTML={{
                __html: documentToHtmlString(roadmap.fields.businessTeam),
              }}
            />
          </Column>
        </Table>
      </TableSection>
    </Container>
  )
}

export default RoadmapPage
