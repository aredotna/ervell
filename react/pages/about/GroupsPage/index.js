import React, { Component } from 'react';
import styled from 'styled-components';

import { GenericButton as Button } from 'react/components/UI/GenericButton';
import Box from 'react/components/UI/Box';

import { Headline, Subheadline, Description } from 'react/pages/about/components/Text';
import CenterBox from 'react/pages/about/components/CenterBox';
import WideScreenshot from 'react/pages/about/components/WideScreenshot';

const Container = styled.div`
  margin-top: 4em;
`;

const Content = styled.div`
  width: 100%;
  padding-bottom: 6em;
  border-top: 1px solid ${x => x.theme.colors.gray.regular};
  background: linear-gradient(${x => x.theme.colors.gray.extraLight}, white);
`;

const Instructions = styled(Description).attrs({ p: 7 })`
  border: 1px solid ${x => x.theme.colors.gray.regular};
  border-radius: 5px;
  text-align: left;

  ol {
    margin: 0;
    padding: 0;
    list-style: none;
  }
`;

const CTA = styled(Box)`
  border-bottom: 1px solid ${x => x.theme.colors.gray.regular};
`;

export default class GroupsPage extends Component {
  render() {
    return (
      <Container>
        <CenterBox mb={9}>
          <Headline>
            Getting started with Groups
          </Headline>
          <Subheadline>
            A group is a shared account that many people can use to collaborate on Are.na.
            Here’s how it works.
          </Subheadline>
        </CenterBox>
        <Content>
          <CTA>
            <CenterBox mt={9} mb={10} >
              <Subheadline>
                Groups have their own profiles and channels
              </Subheadline>
              <Description align="left" my={7}>
                Every group has a profile page where you can see all your shared content in one place.
                To keep things clear, you can now author channels as the group or transfer existing ones over.
              </Description>
              <WideScreenshot src="https://d2w9rnfcy7mm78.cloudfront.net/1819612/original_7ab7904e928af857a716d08770179fd3.png?1519764799" />
              <Instructions>
                <div>To add group members:</div>
                <ol>
                  <li>1. Click <strong>+ New group</strong> in the main dropdown menu.</li>
                  <li>2. Name your group, choose a privacy setting, and add members.</li>
                  <li>3. Add an avatar for style points.</li>
                </ol>
                <br />
                <div>To create a group channel:</div>
                <ol>
                  <li>1. Once you’ve made your group, click on <strong>+ New channel</strong>.</li>
                  <li>2. Under <strong>channel author</strong>, select the preferred group.</li>
                  <li>3. Create your channel.</li>
                </ol>
              </Instructions>
            </CenterBox>
            <CenterBox mt={9} mb={10} >
              <Subheadline>
                Groups make it easy to collaborate with multiple people.
              </Subheadline>
              <Description align="left" my={7}>
                If you often collaborate with the same people,
                creating a group lets you add everyone to new channels in one click.
              </Description>
              <WideScreenshot src="https://d2w9rnfcy7mm78.cloudfront.net/1819616/original_082481d53bf6c73bd0010f53041e5341.png?1519764802" />
              <Instructions>
                <div>To add group members:</div>
                <ol>
                  <li>
                    1. Go to your group and click the <strong>settings</strong> button on the right.
                  </li>
                  <li>
                    2. Under <strong>manage members</strong>,
                    search for members to invite or enter an email address.
                  </li>
                </ol>
                <br />
                <div>To collaborate with a group:</div>
                <div>
                  Click <strong>add collaborators</strong> at the top
                  of any channel and enter the name of the group.
                </div>
              </Instructions>
            </CenterBox>
            <CenterBox mt={9} mb={10} >
              <Subheadline>
                Group admins can upgrade members to Premium
              </Subheadline>
              <Description align="left" my={7}>
                Groups billing and content management simple for
                professional teams. Just upgrade as you go using the group settings.
              </Description>
              <WideScreenshot src="https://d2w9rnfcy7mm78.cloudfront.net/1819616/original_082481d53bf6c73bd0010f53041e5341.png?1519764802" />
              <Instructions>
                <div>To upgrade members:</div>
                <ol>
                  <li>
                    1. Click on the group name in the main menu.
                  </li>
                  <li>
                    2. Under <strong>manage members</strong>, click <strong>Upgrade members</strong>
                  </li>
                  <li>
                    3. Select members and enter your card information.
                  </li>
                </ol>
              </Instructions>
            </CenterBox>
          </CTA>
          <CTA>
            <CenterBox my={10}>
              <Subheadline>
                Get 25% off Premium when you upgrade group members
              </Subheadline>
              <Button f={5} mt={6} py={6} href="/sign_up">
                Join Now
              </Button>
            </CenterBox>
          </CTA>
          <CTA>
            <CenterBox my={10}>
              <Subheadline>
                Are.na Groups are perfect for teams
              </Subheadline>
              <Description align="left">
                Creating a group profile is a perfect way to manage
                public and private content as a creative business.
                Make your work public while keeping research and
                sketches private. Help team members keep their
                personal channels separate from work. Build new ideas together.
              </Description>
              <Button f={5} mt={6} py={6} href="/sign_up">
                Learn More
              </Button>
            </CenterBox>
          </CTA>
        </Content>
      </Container>
    );
  }
}
