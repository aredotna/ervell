import React from 'react'
import styled from 'styled-components'
import { ScrollingProvider, Section } from 'v2/util/react-scroll-section'

import Box from 'v2/components/UI/Box'
import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import Text from 'v2/components/UI/Text'
import { P } from 'v2/pages/about/components/Text'
import { calculateAge } from 'v2/util/calculateAge'
import FeatureCarouselWithSlides from 'v2/components/FeatureSlides'
import PricingTable from 'v2/pages/about/PricingPage/components/PricingTable'
import { RoadmapPageInner } from 'v2/pages/about/RoadmapPage'
import { EssaysCommunity } from './components/EssaysCommunity'
import { PricingQuestions } from 'v2/pages/about/PricingPage/components/PricingQuestions'
import { PricingCTAs } from 'v2/pages/about/PricingPage/components/PricingCTAs'
import { LoggedOutFooter } from 'v2/components/LoggedOutFooter'
import { Testimonials } from './components/Testimonials'
import { ExtendedArena } from './components/ExtendedArena'
import { TeamChart } from 'v2/pages/home/components/LongTermVision'
import { PricingFeatures } from '../PricingPage/components/PricingFeatures'
import { EducationCTA } from './components/EducationCTA'
import { TopMenu } from './components/TopMenu'

const MaxBox = styled(Box).attrs({
  mx: 'auto',
})`
  max-width: 670px;
  width: 100%;
`
const MaxBoxBottom = styled(MaxBox).attrs({
  mb: 11,
})``

const CenteredSection = styled(MaxBoxBottom)`
  text-align: center;
`

const Header = styled(Text).attrs({
  f: 6,
  fontWeight: 'bold',
  color: 'gray.bold',
  mb: 6,
})``

const SmallHeader = styled(Text).attrs({
  f: 5,
  color: 'gray.bold',
  mb: 6,
})``

export const AboutPage: React.FC = () => {
  const { years, days } = calculateAge()

  return (
    <ScrollingProvider offset={-100}>
      <BlankLayout>
        <TopMenu />
        <Section id={'About'}>
          <CenteredSection mt={9}>
            <Header>About</Header>
            <P>
              Are.na is a place to save content, create collections over time
              and connect ideas. Privately or with other people.
            </P>
            <P>
              Students (highly curious and open to new information), hobbyists
              (deeply into a topic or topics, narrowly focused) or what we call
              connected knowledge collectors (those more experienced but highly
              curious information gatherers who can make disparate connections
              between disciplines) have been the core of our community for{' '}
              <strong>
                {years} years and {days} days
              </strong>
            </P>
            <P>
              With no ads, likes, or recommendations, Are.na is a more mindful
              space where you can work through any project over time. It&#39;s a
              place to structure your ideas and build new forms of knowledge
              together.
            </P>
          </CenteredSection>
        </Section>

        <Section id={'How it works'}>
          <Box mb={10}>
            <Box textAlign="center" mb={6}>
              <Header>How it works</Header>
            </Box>
            <FeatureCarouselWithSlides />
          </Box>
        </Section>

        <Section id={'Pricing &amp; Features'}>
          <Box mb={10}>
            <Box textAlign="center" mb={6}>
              <Header>Pricing &amp; Features</Header>
            </Box>
            <PricingTable />

            <MaxBox pt={8} mb={8}>
              <PricingCTAs />
            </MaxBox>

            <MaxBox py={5} mb={8}>
              <SmallHeader>All plans include:</SmallHeader>
              <PricingFeatures />
            </MaxBox>

            <MaxBox py={5} mb={8}>
              <SmallHeader>Pricing FAQs</SmallHeader>
              <PricingQuestions />
            </MaxBox>
          </Box>
        </Section>

        <Section id={'Education'}>
          <MaxBoxBottom>
            <Box textAlign="center" mb={6}>
              <Header>Education</Header>
            </Box>
            <EducationCTA />
          </MaxBoxBottom>
        </Section>

        <Section id={'Team'}>
          <MaxBoxBottom>
            <Box textAlign="center" mb={6}>
              <Header>Team</Header>
            </Box>
            <P>
              Are.na has many co-founders. Currently, a small team is building
              the platform:
            </P>
            <TeamChart />
            <P mt={6}>
              You can chat with them most Friday mornings (EST) on{' '}
              <a href="/settings/perks">Discord</a>.
            </P>
          </MaxBoxBottom>
        </Section>

        <Section id={'Roadmap'}>
          <MaxBoxBottom>
            <Box textAlign="center" mb={6}>
              <Header>Roadmap</Header>
            </Box>
            <RoadmapPageInner />
          </MaxBoxBottom>
        </Section>

        <Section id={'Editorial'}>
          <MaxBoxBottom>
            <Box textAlign="center" mb={9}>
              <Header>Editiorial, Community and Events</Header>
              <P>
                We regularly feature essays, interviews, and other writing from
                the Are.na community, and we publish a printed Annual once a
                year.
              </P>
            </Box>
            <EssaysCommunity />
          </MaxBoxBottom>
        </Section>

        <Section id={'Testimonials'}>
          <MaxBoxBottom>
            <Box textAlign="center" mb={9}>
              <Header>Testimonials</Header>
            </Box>
            <Testimonials />
          </MaxBoxBottom>
        </Section>

        <Section id={'Extended Are.na'}>
          <MaxBoxBottom>
            <Box textAlign="center" mb={8}>
              <Header>Extended Are.na</Header>
            </Box>
            <ExtendedArena />
          </MaxBoxBottom>
        </Section>

        <Section id={'Contact &amp; Support'}>
          <MaxBoxBottom>
            <Box textAlign="center" mb={8}>
              <Header>Contact &amp; Support</Header>
            </Box>

            <P>
              Find questions and answers in our{' '}
              <a href="https://support.are.na">Help Center</a>.
            </P>

            <P>
              For support questions, email us at{' '}
              <a href="mailto:help@are.na">help@are.na</a>.<br />
              Find us on <a href="https://twitter.com/aredotna">Twitter</a>.
            </P>

            <P>
              For merch, visit our <a href="https://store.are.na">Store</a>.
            </P>

            <P>
              <a href="https://are.na/community-guidelines">
                Community Guidelines
              </a>
              <br />
              <a href="https://are.na/terms">Terms of Use</a>
              <br />
              <a href="https://are.na/privacy">Privacy Policy</a>
              <br />
              <a href="https://www.are.na/share/bEAsbbB">Press Kit</a>
              <br />
              <a href="https://are.na/terms">DMCA</a>
              <br />
            </P>
          </MaxBoxBottom>
        </Section>

        <LoggedOutFooter />
      </BlankLayout>
    </ScrollingProvider>
  )
}
