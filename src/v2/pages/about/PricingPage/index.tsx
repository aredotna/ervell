import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'

import { Headline, Subheadline } from 'v2/pages/about/components/Text'
import CenterBox from 'v2/pages/about/components/CenterBox'
import PricingTable from 'v2/pages/about/PricingPage/components/PricingTable'
import { PricingQuestions } from './components/PricingQuestions'
import { AboutTopBarLayout } from 'v2/components/UI/Layouts/AboutTopBarLayout'
import { LoggedOutFooter } from 'v2/components/LoggedOutFooter'
import { PricingFeatures } from './components/PricingFeatures'
import { PricingLogos } from './components/PricingLogos'

const Container = styled(Box).attrs({
  mt: 10,
})``

const GradientContent = styled.div`
  background: linear-gradient(
    ${x => x.theme.colors.gray.hint},
    ${props => props.theme.colors.background}
  );
  border-top: 1px solid ${x => x.theme.colors.gray.regular};
`

const CTA = styled(Box)`
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
`

const PricingPage: React.FC = () => {
  return (
    <AboutTopBarLayout>
      <Container>
        <Headline color="gray.bold" pb={6} px={[6, 0, 0]} textAlign="center">
          Organize your Internet. Expand your brain.
        </Headline>

        <PricingTable />

        <Box
          border="1px dashed"
          borderColor="gray.medium"
          position="relative"
          maxWidth="700px"
          m="0 auto"
          mb={5}
          p={5}
        >
          <Text f={4} color="gray.bold" textAlign="center">
            Do you use Are.na with a group?
          </Text>
          <Text f={4} color="gray.bold" textAlign="center">
            Learn how{' '}
            <strong>
              <a
                href="/getting-started-with-groups"
                role="link"
                aria-label="Learn how upgrading group members works"
              >
                upgrading group members
              </a>
            </strong>{' '}
            works.
          </Text>
        </Box>

        <Box
          border="1px dashed"
          borderColor="gray.medium"
          position="relative"
          maxWidth="700px"
          m="0 auto"
          mb={5}
          p={5}
        >
          <Text f={4} color="gray.bold" textAlign="center">
            Student or Educator?
          </Text>
          <Text f={4} color="gray.bold" textAlign="center">
            Learn how{' '}
            <strong>
              <a
                href="/education"
                role="link"
                aria-label="Learn more about our 50% discount on Premium plans for students and educators"
              >
                to get 50% discount
              </a>
            </strong>{' '}
            on premium plans.
          </Text>
        </Box>

        <Text f={3} color="gray.medium" textAlign="center" pb={6} mb={8}>
          *A block is an individual piece of content. Blocks can be images,
          text, links, attachments, or embeds.
        </Text>
        <GradientContent>
          <CTA>
            <CenterBox mt={9} mb={6} pb={9}>
              <Headline color="gray.bold" mb={3}>
                What features come free?
              </Headline>
              <PricingFeatures />
            </CenterBox>
          </CTA>

          <PricingLogos />

          <Box mt={9} mb={6} pb={9} maxWidth="470px" mx="auto">
            <Subheadline color="gray.bold" mb={8} textAlign="center">
              FAQs
            </Subheadline>

            <PricingQuestions />
          </Box>
        </GradientContent>
      </Container>
      <LoggedOutFooter />
    </AboutTopBarLayout>
  )
}

export default PricingPage
