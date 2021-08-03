import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import { TopLogin } from '../components/TopLogin'
import BlankLayout from 'v2/components/UI/Layouts/BlankLayout'
import Text from 'v2/components/UI/Text'
import { P } from '../components/Common'
import { calculateAge } from '../lib/calculateAge'
import FeatureCarouselWithSlides from '../components/FeatureSlides'
import PricingTable from '../components/PricingTable'
import { RoadmapPageInner } from 'v2/pages/about/RoadmapPage'
import { EssaysCommunity } from './components/EssaysCommunity'

const MaxBox = styled(Box).attrs({
  mx: 'auto',
  mb: 10,
})`
  max-width: 670px;
  width: 100%;
`

const Section = styled(MaxBox)`
  text-align: center;
`

const Header = styled(Text).attrs({
  f: 6,
  fontWeight: 'bold',
  color: 'gray.bold',
  mb: 6,
})``

export const AboutPage: React.FC = () => {
  const { years, days } = calculateAge()
  return (
    <BlankLayout>
      <TopLogin />
      <Section mt={9}>
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
          <strong>
            {years} years and {days} days
          </strong>
        </P>
        <P>
          With no ads, likes, or recommendations, Are.na is a more mindful space
          where you can work through any project over time. It&#39;s a place to
          structure your ideas and build new forms of knowledge together.
        </P>
      </Section>

      <Box mb={10}>
        <Box textAlign="center" mb={6}>
          <Header>How it works</Header>
        </Box>
        <FeatureCarouselWithSlides />
      </Box>

      <Box mb={10}>
        <Box textAlign="center" mb={6}>
          <Header>Pricing &amp; Features</Header>
        </Box>
        <PricingTable />
      </Box>

      <MaxBox>
        <Box textAlign="center" mb={6}>
          <Header>Roadmap</Header>
        </Box>
        <RoadmapPageInner />
      </MaxBox>

      <MaxBox>
        <Box textAlign="center" mb={9}>
          <Header>Essays, Community and Events</Header>
          <P>
            We regularly interterview and commission essays from members of our
            community, and we publish a printed Annual once a year.
          </P>
        </Box>
        <EssaysCommunity />
      </MaxBox>
    </BlankLayout>
  )
}
