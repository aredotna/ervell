import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import Text from 'v2/components/UI/Text'
import Icons from 'v2/components/UI/Icons'

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
  margin-top: ${props => props.theme.space[10]};
  background: linear-gradient(
    ${x => x.theme.colors.gray.hint},
    ${props => props.theme.colors.background}
  );
  border-top: 1px solid ${x => x.theme.colors.gray.regular};
`

const CTA = styled(Box)`
  border-bottom: 1px solid ${x => x.theme.colors.gray.light};
`

const CTAContainer = styled(Box).attrs({
  border: '1px dashed',
  borderColor: 'gray.medium',
  position: 'relative',
  maxWidth: '600px',
  m: '0 auto',
  mb: 5,
  p: 5,
  borderRadius: '300px',
})``

const PricingPage: React.FC = () => {
  return (
    <AboutTopBarLayout>
      <Container>
        <Headline color="gray.bold" pb={6} px={[6, 0, 0]} textAlign="center">
          Organize your Internet. Expand your brain.
        </Headline>

        <PricingTable />

        <CTAContainer>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Icons name="Group" size="1em" mr={4} color="gray.bold" />
            <Text f={4} color="gray.bold" textAlign="center">
              Do you use Are.na on a team or in a group?
            </Text>
          </Box>

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
        </CTAContainer>

        <CTAContainer>
          <Box display="flex" alignItems="center" justifyContent="center">
            <Icons
              name="Clipboard"
              size="0.75em"
              mr={3}
              mb={1}
              color="gray.bold"
            />
            <Text f={4} color="gray.bold" textAlign="center">
              Student or using Are.na in a class?
            </Text>
          </Box>
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
        </CTAContainer>
        <GradientContent>
          <CTA>
            <CenterBox mt={9} mb={6} pb={9}>
              <Headline color="gray.bold" mb={3}>
                What features come free?
              </Headline>
              <PricingFeatures />
            </CenterBox>
          </CTA>

          <Box px={9} mt={9} mb={6} pb={9}>
            <PricingLogos />
          </Box>

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
