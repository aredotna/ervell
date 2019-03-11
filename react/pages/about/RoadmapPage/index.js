import React, { PureComponent } from 'react';
import styled from 'styled-components';
import PropTypes from 'prop-types';
import { documentToHtmlString } from '@contentful/rich-text-html-renderer';

import Box from 'react/components/UI/Box';
import Text from 'react/components/UI/Text';

import { Headline, Subheadline, Description } from 'react/pages/about/components/Text';
import { GenericButtonLink as Button } from 'react/components/UI/GenericButton';
import { Table, TableSection, Column, LightColumn, ColumnHeader, Cell } from 'react/pages/about/RoadmapPage/components/Table';

const Container = styled(Box).attrs({
  mt: 9,
})``;

const Paragraph = styled(Description).attrs({
  mx: 'auto',
  my: 7,
  align: 'left',
})`
  max-width: 470px;
  width: 100%;
`;

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
`;

export default class RoadmapPage extends PureComponent {
  static propTypes = {
    roadmap: PropTypes.shape.isRequired,
  }

  render() {
    const { roadmap } = this.props;
    const dateOptions = {
      weekday: 'long', year: 'numeric', month: 'long', day: 'numeric',
    };
    const lastUpdated = new Date(roadmap.sys.updatedAt).toLocaleDateString('en-US', dateOptions);

    return (
      <Container pb={10}>
        <Headline color="gray.bold">
          Here&apos;s where we&apos;re at.
        </Headline>

        <Paragraph>
          Welcome to the Are.na roadmap.
          Here you can see what we’ve shipped recently, what we’re building next,
          and how we’re doing as a company.
        </Paragraph>

        <Paragraph>
          By sharing this information we aim to demystify the weird and wonderful process of
          working on a mostly bootstrapped web company.
          We’re working our hardest to build a space that’s mindful,
          respectful, and accountable to our thousands of lovely members.
          We have lots of ideas for how to do a better job, as well as lots of challenges.
        </Paragraph>

        <Paragraph pb={8}>
          This is meant to be as transparent as reasonably possible.
          If there’s something you don’t see here that you’d like to know,
          just email everyone@are.na.
        </Paragraph>

        <Headline color="gray.bold">
          Become a monthly supporter
        </Headline>

        <Paragraph>
          Chip in a little extra to help Are.na develop new features and reach sustainability.
          Monthly supporters will receive regular emails from the team,
          plus a unique piece of Are.na merch.
        </Paragraph>

        <Box justifyContent="center" mt={7} mb={10} display="flex">
          <script src="https://app.giveforms.com/install-popup-button.js" type="text/javascript" defer />
          <link rel="stylesheet" href="https://app.giveforms.com/giveforms_embed.css" />
          <ContributeButton className="giveforms-donation-button" href="https://arena.giveforms.com/are-na-supporter">
            Contribute
          </ContributeButton>
        </Box>

        <TableSection>
          <Subheadline pb={1} mb={0} color="gray.bold">Product</Subheadline>
          <Text f={3} pb={8}>Last updated: {lastUpdated}</Text>
          <Table>
            <Column>
              <ColumnHeader>
                In Progress
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.productInProgress),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>
                Up next
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.productUpNext),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>
                On the Horizon
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.productOnTheHorizon),
                }}
              />
            </Column>
            <LightColumn>
              <ColumnHeader>
                Completed
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.productCompleted),
                }}
              />
            </LightColumn>
          </Table>
        </TableSection>

        <TableSection>
          <Subheadline pb={1} mb={0} color="gray.bold">Business</Subheadline>
          <Text f={3} pb={8}>Last updated: {lastUpdated}</Text>
          <Table>
            <Column>
              <ColumnHeader>
                Revenue &amp; Strategy
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.businessRevenue),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>
                Ethics
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.businessEthics),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>
                Community
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.businessCommunity),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>
                Team
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.businessTeam),
                }}
              />
            </Column>
          </Table>
        </TableSection>

        <TableSection>
          <Subheadline pb={1} mb={0} color="gray.bold">Current Stats</Subheadline>
          <Text f={3} pb={8}>Last updated: {lastUpdated}</Text>
          <Table>
            <Column>
              <ColumnHeader>
                Monthly recurring revenue
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.statsMrr),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>
                Monthly active people
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.statsMau),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>
                Total paying customers
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.statsCustomers),
                }}
              />
            </Column>
            <Column>
              <ColumnHeader>
                Monthly connections
              </ColumnHeader>
              <Cell
                dangerouslySetInnerHTML={{
                  __html: documentToHtmlString(roadmap.fields.statsConnections),
                }}
              />
            </Column>
          </Table>
        </TableSection>

      </Container>
    );
  }
}
