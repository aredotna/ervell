import React from 'react'
import { storiesOf } from '@storybook/react'

import Meter from 'v2/components/UI/Meter'

storiesOf('Meter', module).add('default', () => (
  <Meter
    bg="gray.light"
    borderColor="transparent"
    borderRadius="1.5em"
    startColor="state.premium"
    endColor="state.supporter"
    amount={500}
    limit={1000}
    p={4}
  />
))
