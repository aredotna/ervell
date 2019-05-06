import React, { PureComponent } from 'react'
import styled from 'styled-components'
import PropTypes from 'prop-types'
import { documentToHtmlString } from '@contentful/rich-text-html-renderer'

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
    background-color: white;
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
    background-color: white;
    color: ${x => x.theme.colors.state.premium};
  }
`

export default class RoadmapPage extends PureComponent {
  static propTypes = {
    roadmap: PropTypes.shape.isRequired,
  }

  render() {
    const { roadmap } = this.props
    const dateOptions = {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    }
    const lastUpdated = new Date(roadmap.sys.updatedAt).toLocaleDateString(
      'en-US',
      dateOptions
    )

    return (
      <Container pb={10}>
        <Headline color="gray.bold">Here&apos;s where we&apos;re at.</Headline>

        <Paragraph>
          Welcome to the Are.na roadmap. Here you can see what we’ve shipped
          recently, what we’re building next, and how we’re doing as a company.
        </Paragraph>

        <Paragraph>
          By sharing this information we aim to demystify the weird and
          wonderful process of working on a mostly bootstrapped web company.
          We’re working our hardest to build a space that’s mindful, respectful,
          and accountable to our thousands of lovely members. We have lots of
          ideas for how to do a better job, as well as lots of challenges.
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

        <Paragraph pb={6}>
          <GoalMeter
            currentMrr={roadmap.fields.rawMrr}
            goalMrr={roadmap.fields.rawGoalMrr}
            goalDate={roadmap.fields.goalDate}
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
              mb={10}
              display="flex"
              flexDirection="column"
            >
              <PremiumButton href="/pricing">Go Premium</PremiumButton>
              <Text f={2} textAlign="center" mt={4}>
                Premium members currently contribute&nbsp;
                <br />
                <strong>{roadmap.fields.statsPremiumRevenue}</strong>&nbsp; in
                monthly recurring revenue.
              </Text>
            </Box>
          </div>
          <div>
            <Subheadline color="gray.bold">Monthly Patron</Subheadline>

            <SmallParagraph>
              If you’re already Premium and want to chip in a little extra, or
              if you simply want to help Are.na make faster progress, you can
              make a monthly contribution. You’ll receive regular emails from
              the team, plus a unique piece of Are.na merch.
            </SmallParagraph>

            <Box
              justifyContent="center"
              alignItems="center"
              mt={7}
              mb={10}
              display="flex"
              flexDirection="column"
            >
              <script
                src="https://app.giveforms.com/install-popup-button.js"
                type="text/javascript"
                defer
              />
              <link
                rel="stylesheet"
                href="https://app.giveforms.com/giveforms_embed.css"
              />
              <ContributeButton
                className="giveforms-donation-button"
                href="https://arena.giveforms.com/are-na-supporter"
              >
                Become a Patron
              </ContributeButton>
              <Text f={2} textAlign="center" mt={4}>
                Patrons currently contribute&nbsp;
                <br />
                <strong>{roadmap.fields.statsPatronRevenue}</strong>&nbsp; in
                monthly recurring revenue.
              </Text>
            </Box>
          </div>
        </SupportOptions>

        <TableSection>
          <Subheadline pb={1} mb={0} color="gray.bold">
            Product
          </Subheadline>
          <Text f={3} pb={8}>
            Last updated: {lastUpdated}
          </Text>
          <Table>
            <Column>
              <ColumnHeader>In Progress</ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(
                    roadmap.fields.productInProgress
                  ),
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
              <ColumnHeader>Completed</ColumnHeader>
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
            Company Vision
          </Subheadline>
          <Text f={3} pb={8}>
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
                  __html: documentToHtmlString(
                    roadmap.fields.businessCommunity
                  ),
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

        <TableSection>
          <Subheadline pb={1} mb={0} color="gray.bold">
            Current Stats
          </Subheadline>
          <Text f={3} pb={8}>
            Last updated: {lastUpdated}
          </Text>
          <Table>
            <Column>
              <ColumnHeader>Monthly recurring revenue</ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.statsMrr),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>Monthly active people</ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.statsMau),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>Total paying customers</ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.statsCustomers),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>Monthly connections</ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.statsConnections),
                }}
              />
            </Column>
          </Table>
        </TableSection>
      </Container>
    )
  }
}
