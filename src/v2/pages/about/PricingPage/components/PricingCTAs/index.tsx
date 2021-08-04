import React from 'react'
import styled from 'styled-components'

import Box from 'v2/components/UI/Box'
import HorizontalRule from 'v2/components/UI/HorizontalRule'
import Text from 'v2/components/UI/Text'

const HR = styled(HorizontalRule).attrs({ color: 'gray.light' })`
  height: 1px;
`

const Copy = styled(Text).attrs({
  boldLinks: true,
  color: 'gray.block',
})`
  text-align: center;
`

export const PricingCTAs: React.FC = () => {
  return (
    <Box>
      <Copy>
        Do you use Are.na with a group? <br />
        <a href="/getting-started-with-groups">Learn how</a> upgrading group
        members works.
      </Copy>
      <HR />
      <Copy>
        Student or Educator? <br />
        <a href="/getting-started-with-groups">Learn how</a> to get 50% discount
        on Premium plans.
      </Copy>
    </Box>
  )
}
