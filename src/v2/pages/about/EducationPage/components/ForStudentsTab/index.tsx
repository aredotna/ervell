import React from 'react'
import styled from 'styled-components'
import { GenericButtonLink as Button } from 'v2/components/UI/GenericButton'

import CenterBox from 'v2/pages/about/components/CenterBox'
import { Subheadline, Description } from 'v2/pages/about/components/Text'

const Screenshot = styled.img`
  max-width: 640px;
  width: 100%;
  margin: 0 auto;
  display: block;
`

const PremiumButton = styled(Button)`
  background-color: ${x => x.theme.colors.state.premium};
  border-color: ${x => x.theme.colors.state.premium};
  color: white;

  &:hover {
    border-color: ${x => x.theme.colors.state.premium};
    background-color: ${props => props.theme.colors.background};
    color: ${x => x.theme.colors.state.premium};
  }
`

interface ForStudentsProps {
  scrollToPremium: () => void
}

export const ForStudents: React.FC<ForStudentsProps> = ({
  scrollToPremium,
}) => {
  return (
    <div>
      <CenterBox mt={9} mb={6}>
        <PremiumButton f={3} my={9} onClick={scrollToPremium}>
          Get 50% off Are.na Premium
        </PremiumButton>
        <Subheadline>Give your research a home</Subheadline>
        <Description>
          Organize documents, images, links and more into visual collections.
        </Description>
      </CenterBox>
      <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3017938/original_a5b3f6e3200005d201afef2fdb8f0f11.png?1541873529" />

      <CenterBox mt={9} mb={6}>
        <Subheadline>Collaborate visually</Subheadline>
        <Description>
          Connect collections and invite classmates to work on projects
          together.
        </Description>
      </CenterBox>
      <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3017941/original_f85acc4b4c2b381f74344b856041240f.png?1541873535" />

      <CenterBox mt={9} mb={6}>
        <Subheadline>Find new ideas on Are.na</Subheadline>
        <Description>
          Find ideas and inspiration from thousands of other creative thinkers.
        </Description>
      </CenterBox>
      <Screenshot src="https://d2w9rnfcy7mm78.cloudfront.net/3017943/original_c852f944421a96c8ff1753cc843f78b1.png?1541873535" />
    </div>
  )
}

export default ForStudents
