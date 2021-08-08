import React, { createRef, useEffect, useState } from 'react'
import styled from 'styled-components'

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

const Section = styled(MaxBoxBottom)`
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

export interface Section {
  name: string
  id: string
  ref: React.MutableRefObject<any>
}

export const AboutPage: React.FC = () => {
  const { years, days } = calculateAge()

  const sectionNames = [
    'About',
    'How it works',
    'Pricing &amp; Features',
    'Education',
    'Team',
    'Roadmap',
    'Editorial',
    'Testimonials',
    'Extended Are.na',
    'Contact',
  ] as const

  const [activeSection, setActiveSection] = useState<
    typeof sectionNames[number]
  >('About')

  const sections = sectionNames.map(name => {
    const section: Section = {
      name,
      id: name,
      ref: createRef(),
    }
    return section
  })

  const getSection = (name: typeof sectionNames[number]): Section => {
    const foundSection = sections.find(section => {
      return section.name === name
    })
    return foundSection
  }

  // useEffect(() => {
  //   let observer
  //   const hasRefs = sections.every(section => {
  //     return section.ref.current
  //   })

  //   if (hasRefs) {
  //     const options = {
  //       threshold: 0.2,
  //     }
  //     observer = new IntersectionObserver((entries, _observer) => {
  //       entries.forEach(entry => {
  //         if (entry.isIntersecting) {
  //           setActiveSection(entry.target.id as typeof sectionNames[number])
  //         }
  //       })
  //     }, options)
  //     sections.forEach(section => observer.observe(section.ref.current))
  //   }
  //   return () => {
  //     observer.disconnect()
  //   }
  // }, [sections, sectionNames])

  return (
    <BlankLayout>
      <TopMenu sections={sections} selected={activeSection} />
      <Section
        mt={9}
        id={getSection('About')?.id}
        ref={getSection('About')?.ref}
      >
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

      <Box
        mb={10}
        id={getSection('How it works')?.id}
        ref={getSection('How it works')?.ref}
      >
        <Box textAlign="center" mb={6}>
          <Header>How it works</Header>
        </Box>
        <FeatureCarouselWithSlides />
      </Box>

      <Box
        mb={10}
        id={getSection('Pricing &amp; Features')?.id}
        ref={getSection('Pricing &amp; Features')?.ref}
      >
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

      <MaxBoxBottom
        id={getSection('Education')?.id}
        ref={getSection('Education')?.ref}
      >
        <Box textAlign="center" mb={6}>
          <Header>Education</Header>
        </Box>
        <EducationCTA />
      </MaxBoxBottom>

      <MaxBoxBottom id={getSection('Team')?.id} ref={getSection('Team')?.ref}>
        <Box textAlign="center" mb={6}>
          <Header>Team</Header>
        </Box>
        <P>
          Are.na has many co-founders. Currently, a small team is building the
          platform:
        </P>
        <TeamChart />
        <P mt={6}>
          You can chat with them most Friday mornings (EST) on{' '}
          <a href="/settings/perks">Discord</a>.
        </P>
      </MaxBoxBottom>

      <MaxBoxBottom
        id={getSection('Roadmap')?.id}
        ref={getSection('Roadmap')?.ref}
      >
        <Box textAlign="center" mb={6}>
          <Header>Roadmap</Header>
        </Box>
        <RoadmapPageInner />
      </MaxBoxBottom>

      <MaxBoxBottom
        id={getSection('Editorial')?.id}
        ref={getSection('Editorial')?.ref}
      >
        <Box textAlign="center" mb={9}>
          <Header>Editiorial, Community and Events</Header>
          <P>
            We regularly feature essays, interviews, and other writing from the
            Are.na community, and we publish a printed Annual once a year.
          </P>
        </Box>
        <EssaysCommunity />
      </MaxBoxBottom>

      <MaxBoxBottom
        id={getSection('Testimonials')?.id}
        ref={getSection('Testimonials')?.ref}
      >
        <Box textAlign="center" mb={9}>
          <Header>Testimonials</Header>
        </Box>
        <Testimonials />
      </MaxBoxBottom>

      <MaxBoxBottom
        id={getSection('Extended Are.na')?.id}
        ref={getSection('Extended Are.na')?.ref}
      >
        <Box textAlign="center" mb={8}>
          <Header>Extended Are.na</Header>
        </Box>
        <ExtendedArena />
      </MaxBoxBottom>

      <MaxBoxBottom
        id={getSection('Contact')?.id}
        ref={getSection('Contact')?.ref}
      ></MaxBoxBottom>

      <LoggedOutFooter />
    </BlankLayout>
  )
}
