import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'
import Box from 'v2/components/UI/Box'
import StripeContext from 'v2/components/StripeContext'

import MyCreditCard from 'v2/components/MyCreditCard'

storiesOf('MyCreditCard', module).add('MyCreditCard', () => (
  <Specimen>
    <Box height="40em" width="35em" border="1px dashed red">
      <StripeContext>
        <MyCreditCard />
      </StripeContext>
    </Box>
  </Specimen>
))
