import React from 'react'
import styled from 'styled-components'

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

export const CTA = styled(Box)`
  border-top: 1px solid ${x => x.theme.colors.gray.semiLight};
`

export const EducationPage: React.FC = () => {
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
            <ForStudentsTab />
          </TabContent>
          <TabContent label="For Educators">
            <ForEducatorsTab />
          </TabContent>
        </Tabs>

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
