import React, { Component } from 'react';
import styled from 'styled-components';

import { GenericButton as Button } from 'react/components/UI/GenericButton';
import Box from 'react/components/UI/Box';
import Tabs from 'react/components/UI/Tabs';

import { Headline, Subheadline, Description } from 'react/pages/about/components/Text';
import CenterBox from 'react/pages/about/components/CenterBox';

import ForEducatorsTab from 'react/pages/about/EducationPage/components/ForEducatorsTab';
import ForStudentsTab from 'react/pages/about/EducationPage/components/ForStudentsTab';
import UniversityLogoCta from 'react/pages/about/EducationPage/components/UniversityLogoCta';
import CaseStudiesCta from 'react/pages/about/EducationPage/components/CaseStudiesCta';

const Container = styled.div`
  margin-top: 4em;
`;

const TabContent = styled.div`
  width: 100%;
  padding-bottom: 6em;
  border-bottom: 1px solid ${x => x.theme.colors.gray.regular};
`;

const CTA = styled(Box)`
  border-bottom: 1px solid ${x => x.theme.colors.gray.regular};
`;

export default class EducationPage extends Component {
  render() {
    return (
      <Container>
        <CenterBox mb={9}>
          <Headline>
            Grow ideas organically
          </Headline>
          <Subheadline>
            Are.na helps students and educators share knowledge by making connections together.
          </Subheadline>
        </CenterBox>
        <Tabs>
          <TabContent label="For Educators">
            <ForEducatorsTab />
          </TabContent>
          <TabContent label="For Students">
            <ForStudentsTab />
          </TabContent>
        </Tabs>
        <CTA>
          <CenterBox my={10}>
            <Subheadline>
              Get 50% off Are.na Premium
            </Subheadline>
            <Description>
              Are.na Premium gives you unlimited privacy for personal projects.
              Use coupon code <strong>education</strong> to upgrade for half the price.
            </Description>
            <Button f={4} mt={6} href="/sign_up">
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
            <Description>
              We’re people making tools for people. If you’d like to ask a question or just chat, send us an email at <a href="mailto:everyone@are.na">everyone@are.na</a>. You can also <a href="https://confirmsubscription.com/h/d/728B9103B7704F3A">subscribe to our newsletter</a> for monthly updates.
            </Description>
          </CenterBox>
        </CTA>
      </Container>
    );
  }
}
