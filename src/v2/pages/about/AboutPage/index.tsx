import React, { useContext, useEffect } from 'react'
import styled from 'styled-components'
import {
  ScrollContext,
  ScrollingProvider,
  Section,
} from 'v2/util/react-scroll-section'

import Box from 'v2/components/UI/Box'
import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import Button from 'v2/components/UI/GenericButton'
import Text from 'v2/components/UI/Text'
import { P } from 'v2/pages/about/components/Text'
import { calculatedAgePhrase } from 'v2/util/calculateAge'
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
import constants from 'v2/styles/constants'
import { useParams } from 'react-router'
import { AboutPageContents } from '__generated__/contentful/AboutPageContents'
import { AboutPageContents as AboutPageContentsQuery } from './contentfulQueries/aboutPage'
import { useQuery } from '@apollo/client'
import TeamInner from './components/Team'
import BusinessModelAndPosition from './components/BusinessModelAndPosition'
import { CommunityApiProjects } from './components/CommunityApiProjects'

const MaxBox = styled(Box).attrs({
  mx: 'auto',
})`
  padding: 0 50px;

  ${constants.media.large`
    padding: 0 3vw;
  `}
  max-width: 670px;
  width: 100%;
`

const PricingTableContainer = styled(MaxBox)`
  max-width: initial;

  ${constants.media.large`
    max-width: 670px;
  `}
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

interface AboutPageProps {
  section?: string
}

const AboutPageInner: React.FC<AboutPageProps> = ({ section }) => {
  const { scrollTo } = useContext(ScrollContext)

  useEffect(() => {
    const timer1 = setTimeout(() => {
      if (section) {
        scrollTo(decodeURIComponent(section))
      }
    }, 500)

    return () => {
      clearTimeout(timer1)
    }
  }, [section, scrollTo])

  const { data } = useQuery<AboutPageContents>(AboutPageContentsQuery, {
    context: { clientName: 'contentful' },
    ssr: false,
  })

  return (
    <BlankLayout>
      <TopMenu />
      <Section id={'About'}>
        <CenteredSection mt={[10, 10, 9]}>
          <Header>About</Header>
          <P>
            Are.na is a place to save content, create collections over time and
            connect ideas. Privately or with other people.
          </P>
          <P>
            Students (highly curious and open to new information), hobbyists
            (deeply into a topic or topics, narrowly focused) or what we call
            connected knowledge collectors (those more experienced but highly
            curious information gatherers who can make disparate connections
            between disciplines) have been the core of our community for{' '}
            <strong>{calculatedAgePhrase()}</strong>
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

          <PricingTableContainer>
            <PricingTable />
          </PricingTableContainer>

          <Text f={3} color="gray.medium" textAlign="center" py={6} mb={8}>
            *A block is an individual piece of content. Blocks can be images,
            text, links, attachments, or embeds.
          </Text>

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
          <TeamInner content={data?.aboutPage.team.teamDescription} />
          <Box mt={8}>
            <TeamChart />
          </Box>
        </MaxBoxBottom>
      </Section>

      <Section id={'Business model'}>
        <MaxBoxBottom>
          <Box textAlign="center" mb={6}>
            <Header>Business model</Header>
          </Box>
          <BusinessModelAndPosition
            content={
              data?.aboutPage.businessModelAndPosition.businessModelContent
            }
          />
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

      <Section id={'API / Community Projects'}>
        <Box mb={10}>
          <MaxBox>
            <Box textAlign="center" mb={8}>
              <Header>API and Community Projects</Header>
              <P>
                Are.na is &quot;Open Source by Default&quot; and we&apos;re
                always excited to see people using the platform in new ways. You
                can find a{' '}
                <a href="https://www.are.na/are-na-commons/are-na-tools">
                  list of projects built with Are.na
                </a>{' '}
                and find more resources in the{' '}
                <a href="https://www.are.na/are-na-commons/are-na-community-dev-lounge">
                  Arena Community Dev Lounge
                </a>
                .
              </P>
              <Box
                textAlign="center"
                display="flex"
                justifyContent="space-between"
                flexDirection={['column', 'row']}
              >
                <Button
                  f={3}
                  mr={6}
                  px={9}
                  my={5}
                  color="gray.block"
                  href="https://dev.are.na/documentation/channels"
                >
                  API Documentation
                </Button>

                <Button
                  f={3}
                  mr={6}
                  px={9}
                  my={5}
                  color="gray.block"
                  href="https://github.com/aredotna"
                >
                  Github
                </Button>
              </Box>
            </Box>
          </MaxBox>

          <CommunityApiProjects />
        </Box>
      </Section>

      <Section id={'Editorial'}>
        <MaxBoxBottom>
          <Box textAlign="center" mb={9}>
            <Header>Editiorial, Community and Events</Header>
            <P>
              We regularly feature essays, interviews, and other writing from
              the Are.na community, and we publish a printed Annual once a year.
            </P>
          </Box>
          <EssaysCommunity />
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

      <Section id={'Testimonials'}>
        <MaxBoxBottom>
          <Box textAlign="center" mb={9}>
            <Header>Testimonials</Header>
          </Box>
          <Testimonials />
        </MaxBoxBottom>
      </Section>

      <Section id={'Contact and Support'}>
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
            <a href="https://are.na/terms#dmca">DMCA</a>
            <br />
          </P>
        </MaxBoxBottom>
      </Section>

      <LoggedOutFooter />
    </BlankLayout>
  )
}

export const AboutPage: React.FC = () => {
  const { section } = useParams()

  return (
    <ScrollingProvider offset={-100}>
      <AboutPageInner section={section} />
    </ScrollingProvider>
  )
}
