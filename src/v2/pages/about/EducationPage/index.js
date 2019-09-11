import React, { Component } from 'react'
import styled from 'styled-components'

import { GenericButtonLink as Button } from 'v2/components/UI/GenericButton'
import Box from 'v2/components/UI/Box'
import Tabs from 'v2/components/UI/Tabs'

import {
  Headline,
  Subheadline,
  Description,
} from 'v2/pages/about/components/Text'
import CenterBox from 'v2/pages/about/components/CenterBox'

import ForEducatorsTab from 'v2/pages/about/EducationPage/components/ForEducatorsTab'
import ForStudentsTab from 'v2/pages/about/EducationPage/components/ForStudentsTab'
import UniversityLogoCta from 'v2/pages/about/EducationPage/components/UniversityLogoCta'
import CaseStudiesCta from 'v2/pages/about/EducationPage/components/CaseStudiesCta'

const Container = styled.div`
  margin-top: 4em;
`

const TabContent = styled.div`
  width: 100%;
  padding-bottom: 6em;
  border-bottom: 1px solid ${x => x.theme.colors.gray.semiLight};
`

const CTA = styled(Box)`
  border-bottom: 1px solid ${x => x.theme.colors.gray.semiLight};
`

export default class EducationPage extends Component {
  premiumRef = React.createRef()

  scrollToPremium = () => {
    window.scroll({
      top: this.premiumRef.current.offsetTop - 100,
      behavior: 'smooth',
    })
  }

  render() {
    return (
      <Container>
        <CenterBox mb={8}>
          <Headline>Grow ideas organically</Headline>
          <Subheadline>
            Are.na helps students and educators share knowledge by making
            connections together.
          </Subheadline>
          <Button
            f={2}
            mt={6}
            onClick={this.scrollToPremium}
            color="state.premium"
          >
            Get 50% off Are.na Premium
          </Button>
        </CenterBox>
        <Tabs>
          <TabContent label="For Students">
            <ForStudentsTab />
          </TabContent>
          <TabContent label="For Educators">
            <ForEducatorsTab />
          </TabContent>
        </Tabs>
        <div ref={this.premiumRef}>
          <CTA>
            <CenterBox my={10}>
              <Subheadline>Get 50% off Are.na Premium</Subheadline>
              <Description>
                Are.na Premium gives you unlimited privacy for personal
                projects. Use coupon code <strong>learning</strong> to get two
                years of Premium for half the price.
              </Description>
              <Button f={5} mt={6} py={6} href="/sign_up">
                Join Now
              </Button>
            </CenterBox>
          </CTA>
        </div>
        <UniversityLogoCta />
        <CaseStudiesCta />
        <CTA>
          <CenterBox my={10}>
            <Subheadline>Questions? Contact Us.</Subheadline>
            <Description align="left">
              We’re people making tools for people. If you’d like to ask a
              question or just chat, send us an email at{' '}
              <a href="mailto:everyone@are.na">everyone@are.na</a>.<br />
              You can also{' '}
              <a href="https://confirmsubscription.com/h/d/728B9103B7704F3A">
                subscribe to our newsletter
              </a>{' '}
              for monthly updates.
            </Description>
          </CenterBox>
        </CTA>
      </Container>
    )
  }
}
