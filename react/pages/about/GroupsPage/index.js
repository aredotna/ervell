import React, { Component } from 'react';
import styled from 'styled-components';

import { GenericButton as Button } from 'react/components/UI/GenericButton';
import Box from 'react/components/UI/Box';

import { Headline, Subheadline, Description } from 'react/pages/about/components/Text';
import CenterBox from 'react/pages/about/components/CenterBox';

import UniversityLogoCta from 'react/pages/about/EducationPage/components/UniversityLogoCta';
import CaseStudiesCta from 'react/pages/about/EducationPage/components/CaseStudiesCta';

const Container = styled.div`
  margin-top: 4em;
`;

const Content = styled.div`
  width: 100%;
  padding-bottom: 6em;
  border-top: 1px solid ${x => x.theme.colors.gray.regular};
  background: linear-gradient(${x => x.theme.colors.gray.extraLight}, white);
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
            <CenterBox my={10}>
              <Subheadline>
                Get 50% off Are.na Premium
              </Subheadline>
              <Description>
                Are.na Premium gives you unlimited privacy for personal projects.
                Use coupon code <strong>education</strong> to upgrade for half the price.
              </Description>
              <Button f={5} mt={6} py={6} href="/sign_up">
                Join Now
              </Button>
            </CenterBox>
          </CTA>
          <UniversityLogoCta />
          <CaseStudiesCta />
          <CTA>
            <CenterBox my={10}>
              <Subheadline>
                Questions? Contact Us.
              </Subheadline>
              <Description align="left">
                We’re people making tools for people. If you’d like to ask a question or just chat, send us an email at <a href="mailto:everyone@are.na">everyone@are.na</a>.<br />
                You can also <a href="https://confirmsubscription.com/h/d/728B9103B7704F3A">subscribe to our newsletter</a> for monthly updates.
              </Description>
            </CenterBox>
          </CTA>
        </Content>
      </Container>
    );
  }
}
