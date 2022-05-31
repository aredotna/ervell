import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

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
import { AboutTopBarLayout } from 'v2/components/UI/Layouts/AboutTopBarLayout'
import { LoggedOutFooter } from 'v2/components/LoggedOutFooter'

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

export const EducationPage: React.FC = () => {
  const premiumRef = React.createRef<any>()

  const scrollToPremium = () => {
    window.scroll({
      top: premiumRef.current.offsetTop - 100,
      behavior: 'smooth',
    })
  }

  return (
    <AboutTopBarLayout>
      <Container>
        <CenterBox mb={8}>
          <Headline>Grow ideas organically</Headline>
          <Subheadline>
            Are.na helps students and educators share knowledge by making
            connections together.
          </Subheadline>
        </CenterBox>
        <Tabs>
          <TabContent label="For Students">
            <ForStudentsTab scrollToPremium={scrollToPremium} />
          </TabContent>
          <TabContent label="For Educators">
            <ForEducatorsTab />
          </TabContent>
        </Tabs>
        <div ref={premiumRef}>
          <CTA>
            <CenterBox my={10}>
              <Subheadline>Get 50% off Are.na Premium</Subheadline>
              <Description>
                Are.na Premium gives you unlimited blocks and extra features.
                Use coupon code{' '}
                <a href="/settings/billing">
                  <Text display="inline" color="state.premium" font="mono">
                    CURIOUS
                  </Text>
                </a>{' '}
                to get two years of Premium for half the price.
              </Description>
            </CenterBox>
          </CTA>
        </div>
        <UniversityLogoCta />
        <CaseStudiesCta />
        <Box>
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
        </Box>
      </Container>
      <LoggedOutFooter />
    </AboutTopBarLayout>
  )
}

export default EducationPage
