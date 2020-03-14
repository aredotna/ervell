import React from 'react'
import { storiesOf } from '@storybook/react'

import Specimen from 'v2/stories/__components__/Specimen'
import { MobileBanner } from 'v2/components/MobileBanner'
import Box from 'v2/components/UI/Box'

storiesOf('MobileBanner', module).add('default', () => (
  <Specimen>
    <Box height="30em">
      <MobileBanner route="explore" />
    </Box>
  </Specimen>
))
