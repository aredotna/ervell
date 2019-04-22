import React, { Component } from 'react';
import styled from 'styled-components';

import { GenericButtonLink as Button } from 'react/components/UI/GenericButton';
import Box from 'react/components/UI/Box';

import { Headline, Subheadline, Description } from 'react/pages/about/components/Text';
import CenterBox from 'react/pages/about/components/CenterBox';
import WideScreenshot from 'react/pages/about/components/WideScreenshot';

const Container = styled.div`
  margin-top: 4em;
`;

const Content = styled.div`
  width: 100%;
  padding-bottom: 0;
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
            Make shared accounts to collaborate with other people.
          </Subheadline>
        </CenterBox>
        <Content>
          <CTA>
            <CenterBox mt={9} mb={10} >
              <Subheadline>
                Groups have their own profiles and channels
              </Subheadline>
              <Description align="left" my={7}>
                Every group has a profile page where you can see all
                your shared content in one place.
              </Description>
              <WideScreenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3341731/large_f373ae2d20fa284496fadd43ec4a85ca.jpg?1546818129" />
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
                Groups let you collaborate with a click.
              </Subheadline>
              <Description align="left" my={7}>
                Quickly add your whole team to new channels.
                Keep work and personal content separate.
              </Description>
              <WideScreenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3341732/large_78c08110b0391a1d69d17cdd546293cd.jpg?1546818134" />
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
                Billing is simple for professional teams. Invite members and upgrade as you go.
              </Description>
              <WideScreenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3341733/large_aa6fa4648b9a1663d47eb416c9c3ae9f.jpg?1546818148" />
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
              <Button f={5} mt={6} py={6} href="/pricing">
                Join Now
              </Button>
            </CenterBox>
          </CTA>
          <CTA>
            <CenterBox my={10}>
              <Subheadline>
                More Features
              </Subheadline>
              <Description>
                Learn more about group features, privacy
                settings, and transferring existing channels.
              </Description>
              <Button f={5} mt={6} py={6} href="http://help.are.na/knowledge_base/categories/feature-updates-1">
                Groups FAQs
              </Button>
            </CenterBox>
          </CTA>
        </Content>
      </Container>
    );
  }
}
